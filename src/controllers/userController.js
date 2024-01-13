const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');
const { resourcesPath } = require('../constants');
const deleteFile = require('../components/deleteFile');

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
        res.status(500).json({ message: 'Server Side Error', data: false });
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
            avatar: Joi.string().optional()
        });

        // Validate the request data against the schema
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: `Validation Error : ${error?.details?.[0]?.message}`, error: error.details });
        }


        if (req?.file?.error) {
            return res.status(400).json({
                message: 'Validation Error', error: {
                    message: req?.file?.error
                }
            });
        }

        // Update user properties based on validated data
        user.email = value.email || user.email;
        user.firstName = value.firstName || user.firstName;
        user.lastName = value.lastName || user.lastName;

        if (value?.password) {
            const hashedPassword = await bcrypt.hash(value.password, 10);
            user.password = hashedPassword;
        }

        if (req?.file?.path) {

            if (user?.avatar) {
                deleteFile(`${resourcesPath}/${user?.avatar}`)
            }
            // Update the user object with the avatar path or URL
            user.avatar = req.file.path?.replace(`${resourcesPath}/`, '');
        }

        user.save();

        // Return the user ID
        res.json({ message: "User information", user }); // Assuming user ID is stored in the decoded email field
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Side Error', data: false });
    }
};




module.exports = { protectedRoute, getUser, updateUser };
