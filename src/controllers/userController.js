const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const protectedRoute = (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
};


const getUser = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const user = await User.findOne({ _uuid: auth_uuid });

        // Return the user ID
        res.json({ message: "User information", user }); // Assuming user ID is stored in the decoded email field
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};


const updateUser = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const user = await User.findOne({ _uuid: auth_uuid });


        // Define a schema for validation
        const schema = Joi.object({
            email: Joi.string().email().optional(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            password: Joi.string().min(6).optional(), // Example: Password should be at least 6 characters
        });

        // Validate the request data against the schema
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: 'Validation Error', error: error.details });
        }

        // Update user properties based on validated data
        user.email = value.email || user.email;
        user.firstName = value.firstName || user.firstName;
        user.lastName = value.lastName || user.lastName;

        if (value?.password) {
            const hashedPassword = await bcrypt.hash(value.password, 10);
            user.password = hashedPassword;
        }

        user.save();

        // Return the user ID
        res.json({ message: "User information", user }); // Assuming user ID is stored in the decoded email field
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};




module.exports = { protectedRoute, getUser, updateUser };
