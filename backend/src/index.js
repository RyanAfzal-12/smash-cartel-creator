import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import uberRoutes from './routes/uberRoutes.js';
import websiteRoutes from './routes/websiteRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smashcartel';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ubereats', uberRoutes);
app.use('/api/website', websiteRoutes);
app.use('/api/auth', authRoutes);

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
