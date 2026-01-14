import crypto from 'crypto';

export const verifyUberSignature = (req, res, next) => {
    const signature = req.headers['x-uber-signature'];
    const clientSecret = process.env.UBER_CLIENT_SECRET;

    if (!signature) {
        console.error('❌ Missing X-Uber-Signature header');
        return res.status(401).json({ error: 'Missing signature' });
    }

    const hmac = crypto.createHmac('sha256', clientSecret);
    const body = JSON.stringify(req.body);
    const digest = hmac.update(body).digest('hex');

    if (signature !== digest) {
        console.error('❌ Invalid Uber Signature');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    next();
};
