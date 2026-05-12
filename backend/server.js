import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Portfolio from './models/Portfolio.js';
import path from 'path';
import fs from 'fs';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

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

    const graphicDesignTitles = [
        "Minimalist Brand Identity", "Corporate Brochure Design", "Social Media Ad Campaign",
        "Modern Digital Concept", "Creative Typography Layout", "Abstract Poster Design",
        "Product Packaging Concept", "Event Marketing Materials", "Digital Illustration",
        "Magazine Cover Design", "Modern App Interface", "Business Card Collection",
        "Creative Menu Design", "Infographic Layout", "Brand Guidelines Document",
        "Geometric Pattern Design"
    ];

    const logoTitles = [
        "Tech Startup Logo", "Eco-Friendly Brand Logo", "Luxury Fashion Emblem",
        "Coffee Shop Identity", "Fitness Gym Monogram", "Corporate Typography Logo",
        "Gaming Team Crest", "Real Estate Brand Mark", "Modern Minimalist Logo",
        "Creative Agency Logo"
    ];

    const originalItems = originalImages.map((img, index) => ({
        title: graphicDesignTitles[index] || 'Graphic Design Concept',
        image: `/images/${img}`,
        category: 'Graphic Design'
    }));

    const logoItems = newLogos.map((img, index) => ({
        title: logoTitles[index] || 'Branding Logo',
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

        const currentDate = new Date();
        const htmlReport = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://rg-digital-studio.onrender.com/assets/img/logo.png" alt="RG Digital Works" style="height: 70px; width: 70px; border-radius: 50%; object-fit: cover; border: 2px solid #6d28d9; box-shadow: 0 0 10px rgba(109,40,217,0.3);" />
                <h2 style="color: #6d28d9; margin: 15px 0 5px 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">RG Digital Works</h2>
                <p style="color: #64748b; margin: 0; font-size: 11px; font-weight: bold; letter-spacing: 2px;">DESIGN &bull; DEVELOP &bull; GROW</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; color: #0f172a; margin-top: 0;">Project Inquiry Report</h3>
                
                <table style="width: 100%; margin-bottom: 20px; font-size: 14px; color: #475569;">
                    <tr>
                        <td style="padding: 4px 0;"><strong>Date:</strong> ${currentDate.toLocaleDateString()}</td>
                        <td style="padding: 4px 0; text-align: right;"><strong>Time:</strong> ${currentDate.toLocaleTimeString()}</td>
                    </tr>
                </table>
                
                <h4 style="color: #6d28d9; margin: 25px 0 10px 0; font-size: 16px;">Client Information</h4>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-size: 14px; color: #334155;">
                    <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></p>
                </div>
                
                <h4 style="color: #6d28d9; margin: 25px 0 10px 0; font-size: 16px;">Project Details</h4>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-size: 14px; color: #334155;">
                    <p style="margin: 0 0 8px 0;"><strong>Service:</strong> ${serviceType}</p>
                    <p style="margin: 0 0 8px 0;"><strong>Budget:</strong> ${budget}</p>
                    <p style="margin: 0;"><strong>Timeline:</strong> ${timeline}</p>
                </div>
                
                <h4 style="color: #6d28d9; margin: 25px 0 10px 0; font-size: 16px;">Message</h4>
                <p style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; color: #334155; font-style: italic; font-size: 14px; line-height: 1.6; margin: 0;">"${message}"</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                <p>Thank you for reaching out to RG Digital Works. We will review your inquiry and get back to you shortly.</p>
                <p>&copy; ${currentDate.getFullYear()} RG Digital Works. All rights reserved.</p>
            </div>
        </div>
        `;

        const prospectusPath = path.join(process.cwd(), 'RG_Digital_Works_Prospectus.pdf');
        const attachments = [];
        if (fs.existsSync(prospectusPath)) {
            attachments.push({
                filename: 'RG_Digital_Works_Prospectus.pdf',
                path: prospectusPath
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'manaspchaudhari@gmail.com',
            to: [email, 'rgdigitalworks@gmail.com'],
            subject: `Official Inquiry Report: ${serviceType} for ${name}`,
            html: htmlReport,
            attachments: attachments
        };

        // Attempt to send email (handling failure gracefully if credentials aren't set)
        try {
            if (process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
                console.log('Professional HTML report sent to:', email, 'and rgdigitalworks@gmail.com');
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



app.get('/', (req, res) => {
    res.send('RGDS Freelance API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

