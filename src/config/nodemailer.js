// config/nodemailer.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_GMAIL_USER, // Replace with your email
        pass: process.env.NODEMAILER_GMAIL_PASS, // Replace with your password
    },
});

module.exports = transporter;
