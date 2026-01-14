import * as uberService from '../services/uberService.js';

// In-memory store for demo
let orders = [];

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
                    id: item.id,
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price / 100,
                    options: item.selected_options?.map(o => o.title) || []
                })),
                total: orderData.payment.total_price / 100,
                createdAt: new Date().toISOString()
            };

            orders.unshift(newOrder);
            console.log(`✅ Order ${orderId} added to system`);
        } catch (err) {
            console.error('❌ Failed to process order notification:', err);
        }
    }
};

export const getOrders = (req, res) => {
    res.json(orders);
};
