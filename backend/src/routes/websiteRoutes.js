import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

// Create a new order from the website
router.post('/checkout', orderController.createWebsiteOrder);

export default router;
