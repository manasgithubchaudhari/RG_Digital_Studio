import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true }, // Path to image in public folder
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
