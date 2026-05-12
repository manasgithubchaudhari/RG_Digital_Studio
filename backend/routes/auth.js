import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'rgds_secret_key_2024';

// Mock users for in-memory fallback
let mockUsers = [
    { id: 'mock_admin', name: 'Admin', email: 'admin@rgds.com', password: 'admin', role: 'admin', isEmailVerified: true }
];

const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'manaspchaudhari@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'manaspchaudhari@gmail.com',
            to: email,
            subject: 'Your Registration OTP - RG Digital Studio',
            text: `Your OTP for registration is: ${otp}\nThis OTP is valid for 10 minutes.`
        };

        if (process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.warn(`EMAIL_PASS not set. OTP ${otp} would have been sent to ${email}`);
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Check DB Connection
    if (mongoose.connection.readyState !== 1) {
        console.warn('DB not connected, using mock registration');
        const existingMock = mockUsers.find(u => u.email === email);
        if (existingMock && existingMock.isEmailVerified) return res.status(400).json({ message: 'User already exists (mock)' });
        
        const mockUser = { id: Date.now().toString(), name, email, password, role: 'customer', otp, isEmailVerified: false };
        mockUsers = mockUsers.filter(u => u.email !== email); // remove unverified mock
        mockUsers.push(mockUser);
        
        await sendOTP(email, otp);
        return res.status(200).json({ success: true, message: 'OTP sent to email', requiresOtp: true });
    }

    let user = await User.findOne({ email });
    if (user) {
        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            user.name = name;
            user.password = password;
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        }
    } else {
        user = new User({ name, email, password, role: 'customer', otp, otpExpires, isEmailVerified: false });
        await user.save();
    }
    
    await sendOTP(email, otp);
    res.status(200).json({ success: true, message: 'OTP sent to email', requiresOtp: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        if (mongoose.connection.readyState !== 1) {
            const mockUser = mockUsers.find(u => u.email === email);
            if (!mockUser) return res.status(404).json({ message: 'User not found (mock)' });
            if (mockUser.isEmailVerified) return res.status(400).json({ message: 'Email already verified' });
            if (mockUser.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
            
            mockUser.isEmailVerified = true;
            const token = jwt.sign({ id: mockUser.id, role: mockUser.role }, JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ token, user: { id: mockUser.id, name: mockUser.name, email, role: mockUser.role } });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        if (user.isEmailVerified) return res.status(400).json({ message: 'Email already verified' });
        
        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check DB Connection
    if (mongoose.connection.readyState !== 1) {
        console.warn('DB not connected, using mock login');
        const mockUser = mockUsers.find(u => u.email === email && u.password === password);
        if (!mockUser) return res.status(401).json({ message: 'Invalid credentials (mock)' });
        if (!mockUser.isEmailVerified) return res.status(403).json({ message: 'Please verify your email first', requiresOtp: true });
        
        const token = jwt.sign({ id: mockUser.id, role: mockUser.role }, JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token, user: { id: mockUser.id, name: mockUser.name, email, role: mockUser.role } });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
        // Generate new OTP and send
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        await sendOTP(email, otp);
        return res.status(403).json({ message: 'Please verify your email first. A new OTP has been sent.', requiresOtp: true });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// OAuth (Google/Apple) Login
router.post('/oauth', async (req, res) => {
    try {
        const { email, name, provider } = req.body;

        if (mongoose.connection.readyState !== 1) {
            const token = jwt.sign({ id: 'mock_oauth', role: 'customer' }, JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token, user: { id: 'mock_oauth', name, email, role: 'customer' } });
        }

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ 
                name: name || 'User', 
                email, 
                password: Math.random().toString(36).slice(-8), 
                role: 'customer', 
                isEmailVerified: true 
            });
            await user.save();
        } else if (!user.isEmailVerified) {
            user.isEmailVerified = true;
            await user.save();
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
