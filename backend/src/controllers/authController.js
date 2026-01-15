import User from '../models/User.js';

// In-memory store for OTPs (In production, use Redis or a DB collection)
const otpStore = new Map();

export const sendOTP = async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with an expiry (5 minutes)
    otpStore.set(phone, { otp, expires: Date.now() + 300000 });

    console.log(`
  📱 [SMS SIMULATOR]
  To: ${phone}
  Message: Your Smash Cartel verification code is: ${otp}
  ------------------
  `);

    res.json({ success: true, message: 'OTP sent to your phone (Check server console)' });
};

export const verifyOTP = (phone, otp) => {
    const record = otpStore.get(phone);
    if (!record) return false;
    if (Date.now() > record.expires) {
        otpStore.delete(phone);
        return false;
    }
    if (record.otp === otp) {
        otpStore.delete(phone); // Burn OTP after use
        return true;
    }
    return false;
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminUser = process.env.STAFF_USERNAME || 'admin';
        const adminPass = process.env.STAFF_PASSWORD || 'smash123';

        if (username === adminUser && password === adminPass) {
            return res.json({
                success: true,
                user: { username: adminUser, role: 'admin', fullName: 'Smash Admin' }
            });
        }

        const user = await User.findOne({ username, password });
        if (user) {
            return res.json({
                success: true,
                user: {
                    username: user.username,
                    role: user.role,
                    fullName: user.fullName,
                    phone: user.phone
                }
            });
        }

        res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const register = async (req, res) => {
    const { username, password, fullName, phone, email } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({
            username,
            password,
            fullName,
            phone,
            email,
            role: 'customer'
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            user: { username, role: 'customer', fullName, phone }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};
