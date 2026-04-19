import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'rgds_secret_key_2024';

// Mock users for in-memory fallback
let mockUsers = [
    { id: 'mock_admin', name: 'Admin', email: 'admin@rgds.com', password: 'admin', role: 'admin' }
];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check DB Connection
    if (mongoose.connection.readyState !== 1) {
        console.warn('DB not connected, using mock registration');
        const existingMock = mockUsers.find(u => u.email === email);
        if (existingMock) return res.status(400).json({ message: 'User already exists (mock)' });
        
        const mockUser = { id: Date.now().toString(), name, email, password, role };
        mockUsers.push(mockUser);
        
        const token = jwt.sign({ id: mockUser.id, role: mockUser.role }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({ token, user: { id: mockUser.id, name, email, role } });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();
    
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
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
        
        const token = jwt.sign({ id: mockUser.id, role: mockUser.role }, JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token, user: { id: mockUser.id, name: mockUser.name, email, role: mockUser.role } });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
