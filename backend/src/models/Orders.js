import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Uber resource_id
    externalId: String, // Uber display_id
    source: { type: String, default: 'ubereats' },
    customerName: String,
    phone: String,
    address: String,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number,
        options: [String]
    }],
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);