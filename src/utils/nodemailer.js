// config/nodemailer.js
const nodemailer = require('nodemailer');
const { gmail } = require('../config/mail');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmail?.user, // Replace with your email
        pass: gmail?.pass, // Replace with your password
    },
});

module.exports = transporter;
