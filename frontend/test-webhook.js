import crypto from 'crypto';

const CLIENT_SECRET = '-qIKamfoDKhBl6MfN4kIE6qxzmvMTuK5VkaJ2koe';
const WEBHOOK_URL = 'http://localhost:3001/api/ubereats/webhook';

const samplePayload = {
    event_type: 'orders.notification',
    event_id: 'evt_' + Math.random().toString(36).substr(2, 9),
    event_time: Math.floor(Date.now() / 1000),
    meta: {
        resource_id: 'order_test_' + Math.floor(Math.random() * 10000),
        status: 'created'
    }
};

const body = JSON.stringify(samplePayload);
const hmac = crypto.createHmac('sha256', CLIENT_SECRET);
const signature = hmac.update(body).digest('hex');

console.log('🚀 Sending Test Uber Eats Webhook...');
console.log('Payload:', body);
console.log('Signature:', signature);

fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-uber-signature': signature
    },
    body: body
})
    .then(res => {
        if (res.ok) {
            console.log('✅ Webhook accepted by server (200 OK)');
        } else {
            console.log('❌ Webhook failed with status:', res.status);
        }
    })
    .catch(err => console.error('❌ Connection Error:', err));
