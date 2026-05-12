import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Portfolio from './models/Portfolio.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);

const JWT_SECRET = process.env.JWT_SECRET || 'rgds_secret_key_2024';

// Middleware for JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    next();
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        console.warn('Running in mock mode due to DB connection failure.');
    });

// Helper for mock data
const getMockPortfolio = () => {
    const originalImages = [
        'catloug RGDS_1.jpg', 'catloug RGDS_2.jpg', 'catloug RGDS_3.jpg', 
        'catloug RGDS_4.jpg', 'catloug RGDS_5.jpg', 'catloug RGDS_6.jpg', 
        'catloug RGDS_7.jpg', 'catloug RGDS_8.jpg', 'catloug RGDS_9.jpg', 
        'catloug RGDS_10.jpg', 'catloug RGDS_11.jpg', 'catloug RGDS_12.jpg', 
        'catloug RGDS_13.jpg', 'catloug RGDS_14.jpg', 'catloug RGDS_15.jpg', 
        'catloug RGDS_16.jpg'
    ];
    const newLogos = [
        'logo1.jpeg', 'logo2.jpeg', 'logo3.jpeg', 'logo4.jpeg', 'logo5.jpeg',
        'logo6.jpeg', 'logo7.jpeg', 'logo8.jpeg', 'logo9.jpeg', 'logo10.jpeg'
    ];

    const originalItems = originalImages.map(img => ({
        title: img.replace('.jpg', '').replace(/_/g, ' '),
        image: `/images/${img}`,
        category: 'Graphic Design'
    }));

    const logoItems = newLogos.map(img => ({
        title: img.replace('.jpeg', '').toUpperCase(),
        image: `/assets/img/${img}`,
        category: 'Branding'
    }));

    return [...originalItems, ...logoItems];
};

// Routes
app.get('/api/portfolio', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log('MongoDB not connected, serving mock data');
            return res.json(getMockPortfolio());
        }
        const portfolio = await Portfolio.find().sort({ createdAt: -1 });
        if (portfolio.length === 0) return res.json(getMockPortfolio());
        res.json(portfolio);
    } catch (err) {
        console.error('Portfolio fetch error:', err);
        res.json(getMockPortfolio()); // Fallback even on error
    }
});

import nodemailer from 'nodemailer';

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message, serviceType, budget, timeline } = req.body;
        console.log('New Contact Message:', { name, email, subject, message, serviceType, budget, timeline });
        
        // Nodemailer Setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'manaspchaudhari@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });

        const mailOptions = {
            from: email,
            to: 'manaspchaudhari@gmail.com',
            subject: `New Project Inquiry: ${subject}`,
            text: `
                Name: ${name}
                Email: ${email}
                Service: ${serviceType}
                Budget: ${budget}
                Timeline: ${timeline}
                Message: ${message}
            `
        };

        // Attempt to send email (handling failure gracefully if credentials aren't set)
        try {
            if (process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
            } else {
                console.warn('EMAIL_PASS not set. Email not sent, but logging to console for development.');
            }
        } catch (emailErr) {
            console.error('Email sending failed:', emailErr.message);
        }

        if (mongoose.connection.readyState === 1) {
            const newContact = new Contact({ name, email, subject, message, serviceType, budget, timeline });
            await newContact.save();
        } else {
            console.warn('MongoDB not connected, message not saved to DB but logged to console.');
        }
        
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Seed Portfolio (Initial images) - Protected
app.post('/api/seed-portfolio', authenticateToken, isAdmin, async (req, res) => {
    try {
        const images = [
            'catloug RGDS_1.jpg', 'catloug RGDS_2.jpg', 'catloug RGDS_3.jpg', 
            'catloug RGDS_4.jpg', 'catloug RGDS_5.jpg', 'catloug RGDS_6.jpg', 
            'catloug RGDS_7.jpg', 'catloug RGDS_8.jpg', 'catloug RGDS_9.jpg', 
            'catloug RGDS_10.jpg', 'catloug RGDS_11.jpg', 'catloug RGDS_12.jpg', 
            'catloug RGDS_13.jpg', 'catloug RGDS_14.jpg', 'catloug RGDS_15.jpg', 
            'catloug RGDS_16.jpg'
        ];
        
        const portfolioItems = images.map(img => ({
            title: img.replace('.jpg', '').replace(/_/g, ' '),
            image: `/images/${img}`,
            category: 'Design'
        }));

        await Portfolio.deleteMany({});
        await Portfolio.insertMany(portfolioItems);
        res.json({ message: 'Portfolio seeded successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Route to get all inquiries
app.get('/api/admin/inquiries', authenticateToken, isAdmin, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.warn('DB not connected, serving mock inquiries');
            // Mock inquiries for demo
            return res.json([
                { _id: '1', name: 'Mock Client', email: 'client@example.com', serviceType: 'Web Development', budget: '$5k - $10k', timeline: '3 months', message: 'I need a professional portfolio website.', status: 'Pending', createdAt: new Date() }
            ]);
        }
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/inquiries/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) return res.json({ message: 'Deleted (mock)' });
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Route to update inquiry status
app.put('/api/admin/inquiries/:id/status', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        if (mongoose.connection.readyState !== 1) return res.json({ message: 'Status updated (mock)', status });
        const updatedInquiry = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedInquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Route to get all customers
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json([
                { _id: '1', name: 'Mock Customer', email: 'customer@example.com', role: 'customer', createdAt: new Date() }
            ]);
        }
        const users = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Portfolio CRUD (Admin)
app.post('/api/admin/portfolio', authenticateToken, isAdmin, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) return res.status(201).json({ ...req.body, _id: Date.now().toString() });
        const newItem = new Portfolio(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/admin/portfolio/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) return res.json({ message: 'Deleted (mock)' });
        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Customer Route (My Inquiries)
app.get('/api/customer/my-inquiries', authenticateToken, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json([
                { _id: '1', subject: 'Project Started', serviceType: 'Branding', budget: 'Negotiable', message: 'Excited to start!', status: 'In Progress', createdAt: new Date() }
            ]);
        }
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const inquiries = await Contact.find({ email: user.email }).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('RGDS Freelance API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

