import * as uberService from '../services/uberService.js';
import Order from '../models/Orders.js';

export const handleWebhook = async (req, res) => {
    // Acknowledge receipt to Uber immediately
    res.status(200).send();

    const { event_type, meta } = req.body;

    if (event_type === 'orders.notification') {
        const orderId = meta.resource_id;
        console.log(`📦 Incoming Uber Eats Order: ${orderId}`);

        try {
            const orderData = await uberService.getOrderDetails(orderId);

            const newOrder = {
                id: orderId,
                externalId: orderData.display_id || `UBER-${orderId.slice(0, 4)}`,
                source: 'ubereats',
                customerName: `${orderData.cart.customer.first_name} ${orderData.cart.customer.last_name}`,
                status: 'pending',
                items: orderData.cart.items.map(item => ({
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price / 100,
                    options: item.selected_options?.map(o => o.title) || []
                })),
                total: orderData.payment.total_price / 100,
                createdAt: new Date().toISOString()
            };

            // Save to MongoDB (Upsert to prevent duplicates)
            await Order.findOneAndUpdate(
                { id: orderId },
                newOrder,
                { upsert: true, new: true }
            );

            console.log(`✅ Order ${orderId} saved to Database`);
        } catch (err) {
            console.error('❌ Failed to process order notification:', err);
        }
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { id: id },
            { status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};
