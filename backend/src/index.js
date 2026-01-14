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
