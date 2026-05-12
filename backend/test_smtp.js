import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('Using credentials:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'undefined');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'rgdigitalworks@gmail.com',
    subject: 'SMTP Test from RG Digital Studio',
    text: 'If you receive this, SMTP is working perfectly!'
};

transporter.sendMail(mailOptions)
    .then(info => {
        console.log('Success! Email sent:', info.response);
    })
    .catch(err => {
        console.error('Failed to send email:', err);
    });
