const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Wishlist = require('../models/wishlist');
const Newsletter = require('../models/newsletter');
const fs = require('fs').promises;
const path = require('path');
const nodemailerTransporter = require('../utils/nodemailer');


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



const googleAuth = async (req, res) => {
    try {
        const { id_token } = req.body;

        // Make a request to Google's tokeninfo endpoint to verify the token
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);

        const google = await response?.json();

        const { email, given_name, family_name } = google?.data;

        // Check if the user exists in your database
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new user
            user = new User({
                firstName: given_name,
                lastName: family_name,
                email: email,
                // You may generate a random password here if required
            });
            await user.save();
        }

        // Now user is either registered or already existed, proceed with login
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

const joinWishlist = async (req, res) => {
    try {
        const { name, email } = req.body;
        if(!email) return res.status(400).json({
            message: 'Email is required.'
        });

        const existingUser = await Wishlist.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email is already in wishlist.'
            });
        }

        const user = new Wishlist({
            name,
            email
        });

        await user.save();

        res.status(201).json({ message: 'Email successfully added to wishlist.' })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', data: false });
    }
};
const joinNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) return res.status(400).json({
            message: 'Email is required.'
        });

        const existingUser = await Newsletter.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email is already in newsletter.'
            });
        }

        const user = new Newsletter({
            email
        });

        await user.save();

        res.status(201).json({ message: 'Email successfully added to newsletter.' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', data: false });
    }
};


module.exports = { register, login, googleAuth, joinWishlist, joinNewsletter };
