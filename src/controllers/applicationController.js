const Joi = require("joi");
const User = require("../models/user");
const Application = require("../models/application");

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
            return res.status(400).json({ message: 'Validation Error', error: error.details });
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
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};

const getAppByUser = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const user = await User.findOne({ _uuid: auth_uuid });

        const application = await Application.find({ user_id: user?._id }).get();


        // Return the user ID
        res.json({ message: "Application By User ID", application });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};


const getCurrentApp = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const _id = req?.params?.appId;

        const user = await User.findOne({ _uuid: auth_uuid });

        const application = await Application.findOne({ user_id: user?._id, _id });


        // Return the user ID
        res.json({ message: "Application By User ID", application });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};

module.exports = { getAppByUser, getCurrentApp, createApp }