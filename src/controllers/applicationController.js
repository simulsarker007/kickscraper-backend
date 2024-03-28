const Joi = require("joi");
const User = require("../models/user");
const Application = require("../models/application");
const Request = require("../models/request");

const createApp = async (req, res) => {
    try {

        const { auth_uuid } = req;


        const user = await User.findOne({ _uuid: auth_uuid });

        // Define a schema for validation
        const schema = Joi.object({
            name: Joi.string().required(),
            domain: Joi.string().domain().required()
        });

        // Validate the request data against the schema
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: `Validation Error : ${error?.details?.[0]?.message}`, error: error.details });
        }

        // Check if domain already exists in the Application model
        const existingApplicationDomain = await Application.findOne({ domain: value.domain });

        if (existingApplicationDomain) {
            return res.status(400).json({ message: 'Domain already exists!' });
        }

        const application = new Application({
            user_id: user?._id,
            name: value?.name,
            domain: value?.domain,
            subscription: 'free',
            status: 'active',
        });

        await application.save();
        res.json({ message: "Application Create Successfully", application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Side Error', data: false });
    }
};

const deleteApp = async (req, res) => {

    try {

        const { auth_uuid } = req;


        const _id = req?.params?.appId;

        const user = await User.findOne({ _uuid: auth_uuid });

        // Check if Application is for this user
        const isValidApplication = await Application.findOne({ _id, user_id: user?._id });

        if (!isValidApplication) {
            return res.status(400).json({ message: 'This application is not for this user!' });
        }

        await Application.deleteOne({ _id });
        return res.json({ message: "Application Deleted!", id: _id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Side Error', data: false });
    }
}

const updateApp = async (req, res) => {
    try {

        const { auth_uuid } = req;


        const _id = req?.params?.appId;

        const user = await User.findOne({ _uuid: auth_uuid });

        // Check if Application is for this user
        const isValidApplication = await Application.findOne({ _id, user_id: user?._id });

        if (!isValidApplication) {
            return res.status(400).json({ message: 'This application is not for this user!' });
        }


        // Define a schema for validation
        const schema = Joi.object({
            name: Joi.string().required(),
            domain: Joi.string().domain().required(),
            domain_icon: Joi.string().optional()
        });

        // Validate the request data against the schema
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(500).json({ message: `Validation Error : ${error?.details?.[0]?.message}`, error: error.details });
        }

        // Check if domain already exists in the Application model
        const existingApplicationDomain = await Application.findOne({ domain: value.domain }).nor({ _id });

        if (existingApplicationDomain) {
            return res.status(400).json({ message: 'Domain already exists!' });
        }



        const application = await Application.findOne({ _id });
        // Update user properties based on validated data
        application.name = value.name || application.name;
        application.domain = value.domain || application.domain;
        application.domain_icon = value.domain_icon || application.domain_icon;


        application.save();

        res.json({ message: "Application Saved!", application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Side Error', data: false });
    }
};


const getAppByUser = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const user = await User.findOne({ _uuid: auth_uuid });

        // Use aggregation to fetch applications and their requests
        const applicationsWithRequests = await Application.aggregate([
            // Match applications by user_id
            { $match: { user_id: user._id.toString() } },
            // Lookup to join with requests
            {
                $lookup: {
                    from: "requests", // The collection to join
                    localField: "_id", // Field from the applications collection
                    foreignField: "application", // Field from the requests collection
                    as: "requests" // The array to populate with the matched documents
                },

            },
            {
                $project: {
                    name: 1, // Assuming you want to keep the application's name
                    domain: 1, // And its domain
                    requestCount: { $size: "$requests" } // Count the number of requests
                }
            }
        ]);



        // Return the user ID
        res.json({ message: "Application By User ID", application: applicationsWithRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Side Error', data: false });
    }
};


const getCurrentApp = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const user = await User.findOne({ _uuid: auth_uuid });

        const _id = req?.params?.appId;

        const application = await Application.findOne({ user_id: user?._id, _id });

        if (!application) {
            return res.status(500).json({ message: 'This application is not for this user!' });
        }


        // Return the user ID
        res.json({ message: "Application By User ID", application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Side Error', data: false });
    }
};



module.exports = { getAppByUser, getCurrentApp, createApp, updateApp, deleteApp }