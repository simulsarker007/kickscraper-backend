const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs').promises;
const path = require('path');
const nodemailerTransporter = require('../config/nodemailer');


const register = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email is already registered!',
                data: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Send a registration success email
        // try {

        //     await sendRegistrationEmail(email, user?.firstName, user?.lastName);
        // } catch (error) {
        //     console.log("Error with email", error)
        // }

        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            data: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ auth_uuid: user._uuid }, process.env.JWT_SECRET);

        res.json({ message: "Successfully Loggedin", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', data: false });
    }
};


const sendRegistrationEmail = async (email, firstName, lastName) => {
    try {
        const filePath = path.resolve(__filename, '../../template/email/reg_welcome.html');

        // Read HTML content from the file
        let htmlContent = await fs.readFile(filePath, 'utf-8');

        // Replace placeholders with actual user data
        htmlContent = htmlContent.replace('{firstName}', firstName);
        htmlContent = htmlContent.replace('{lastName}', lastName);

        // Set up email data with HTML content
        const mailOptions = {
            from: process.env.NODEMAILER_FROM_ADDRESS, // Replace with your email
            to: email,
            subject: 'Registration Successful',
            html: htmlContent,
        };

        // Send the email using the configured nodemailer transporter
        await nodemailerTransporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
    }
};


module.exports = { register, login };
