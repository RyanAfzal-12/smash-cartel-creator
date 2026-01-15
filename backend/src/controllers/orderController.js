import Order from '../models/Orders.js';
import { verifyOTP } from './authController.js';

export const createWebsiteOrder = async (req, res) => {
    try {
        const { items, total, customerName, username, phone, otp } = req.body;

        // 1. Stricter Auth Check
        if (!username || username === 'Guest') {
            return res.status(401).json({ error: 'Login required' });
        }

        // 2. OTP Verification (Skip if admin is forcing it for testing, but usually required)
        if (username !== 'admin') {
            const isOTPValid = verifyOTP(phone, otp);
            if (!isOTPValid) {
                return res.status(400).json({ error: 'Invalid or expired OTP' });
            }
        }

        const processedItems = items.map(item => {
            const addOnsTotal = item.selectedAddOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
            return {
                name: item.menuItem.name,
                quantity: item.quantity,
                price: item.menuItem.price + addOnsTotal,
                options: item.selectedAddOns?.map(o => o.name) || []
            };
        });

        const trackingId = `SMASH-${Math.floor(100000 + Math.random() * 900000)}`;

        const newOrder = new Order({
            id: `WEB-${Math.random().toString(36).substr(2, 9)}`,
            externalId: trackingId,
            source: 'website',
            customerName: customerName || 'Valued Customer',
            status: 'pending',
            items: processedItems,
            total: total,
            createdAt: new Date().toISOString()
        });

        await newOrder.save();
        console.log(`✅ Order ${newOrder.id} saved. Tracking ID: ${trackingId}`);

        res.status(201).json({
            success: true,
            trackingId,
            order: newOrder
        });
    } catch (error) {
        console.error('❌ Failed to create website order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};
