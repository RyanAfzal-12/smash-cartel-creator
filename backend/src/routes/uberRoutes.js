import express from 'express';
import * as uberController from '../controllers/uberController.js';
import { verifyUberSignature } from '../middleware/uberAuth.js';

const router = express.Router();

// Webhook endpoint (Requires signature verification)
router.post('/webhook', verifyUberSignature, uberController.handleWebhook);

// Get internal orders for our dashboard
router.get('/orders', uberController.getOrders);

export default router;
