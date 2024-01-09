const Joi = require("joi");
const User = require("../models/user");
const Application = require("../models/application");
const ApiKey = require("../models/api_key");

const createApi = async (req, res) => {
    try {



        // Define a schema for validation
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            type: Joi.string().required(),
            rate_limit: Joi.number().required(),
            is_active: Joi.string().required()
        });

        // Validate the request data against the schema
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: 'Validation Error', error: error.details });
        }


        const { auth_uuid } = req;

        //user
        const user = await User.findOne({ _uuid: auth_uuid });


        const appId = req?.params?.appId;

        //app checking
        const application = await Application.findOne({ user_id: user?._id, _id: appId });


        if (!application) {
            return res.status(404).json({ message: 'Application Not Found', data: false });
        }


        const apiKey = new ApiKey({
            user_id: user?._id,
            app_id: appId,
            name: value?.name,
            description: value?.description,
            type: value?.type,
            rate_limit: value?.rate_limit,
            is_active: value?.is_active
        });


        await apiKey?.save();


        res.json({ message: "Api Key Create Successfully", apiKey });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};

const getApiByApp = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const user = await User.findOne({ _uuid: auth_uuid });

        const appId = req?.params?.appId;

        //app checking
        const application = await Application.findOne({ user_id: user?._id, _id: appId });


        if (!application) {
            return res.status(404).json({ message: 'Application Not Found', data: false });
        }

        const apiKey = ApiKey.find({ app_id: application?._id }).get();


        // Return the user ID
        res.json({ message: "Success", apiKey });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};


const getApiKey = async (req, res) => {
    try {

        const { auth_uuid } = req;

        const _id = req?.params?.apiKeyId;

        const appId = req?.params?.appId;

        const user = await User.findOne({ _uuid: auth_uuid });

        const application = await Application.findOne({ user_id: user?._id, _id: appId });

        if (!application) {
            return res.status(404).json({ message: 'Application Not Found!', data: false });
        }


        const apiKey = await ApiKey.findOne({ user_id: user?._id, app_id: appId, _id })


        if (!apiKey) {
            return res.status(404).json({ message: 'Api Key Not Found!', data: false });
        }

        // Return the user ID
        res.json({ message: "Application By User ID", apiKey });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};


const updateApiKey = async (req, res) => {
    try {

        // Define a schema for validation
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            type: Joi.string().required(),
            rate_limit: Joi.number().required(),
            is_active: Joi.string().required()
        });

        // Validate the request data against the schema
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: 'Validation Error', error: error.details });
        }



        const { auth_uuid } = req;

        const _id = req?.params?.apiKeyId;

        const appId = req?.params?.appId;

        const user = await User.findOne({ _uuid: auth_uuid });

        const application = await Application.findOne({ user_id: user?._id, _id: appId });

        if (!application) {
            return res.status(404).json({ message: 'Application Not Found!', data: false });
        }


        const apiKey = await ApiKey.findOne({ user_id: user?._id, app_id: appId, _id })


        if (!apiKey) {
            return res.status(404).json({ message: 'Api Key Not Found!', data: false });
        }

        apiKey.user_id = user?._id;
        apiKey.app_id = appId;
        apiKey.name = value?.name;
        apiKey.description = value?.description;
        apiKey.type = value?.type;
        apiKey.rate_limit = value?.rate_limit;
        apiKey.is_active = value?.is_active;

        apiKey?.save();

        // Return the user ID
        res.json({ message: "Api Key Updated Successfully", apiKey });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized', data: false });
    }
};

module.exports = { createApi, getApiByApp, getApiKey, updateApiKey }