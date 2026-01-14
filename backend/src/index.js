import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uberRoutes from './routes/uberRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ubereats', uberRoutes);

// Simple Auth for Staff Portal
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.STAFF_USERNAME || 'admin';
  const adminPass = process.env.STAFF_PASSWORD || 'smash123';

  if (username === adminUser && password === adminPass) {
    res.json({ success: true, user: { username: adminUser, role: 'admin' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`
  🚀 Smash Cartel API Server 
  --------------------------
  Port: ${PORT}
  Environment: ${process.env.NODE_ENV}
  Webhook Link: /api/ubereats/webhook
  --------------------------
  `);
});
