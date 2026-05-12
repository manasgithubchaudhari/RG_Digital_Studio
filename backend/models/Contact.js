import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    serviceType: { type: String },
    budget: { type: String },
    timeline: { type: String },
    status: { type: String, enum: ['Pending', 'In Review', 'In Progress', 'Completed', 'Delivered'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
