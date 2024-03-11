const Request = require('../models/request');
const User = require('../models/user');

// Controller function to get requests within the last 24 hours
exports.getRequestsLast24Hours = async (req, res) => {

    const { auth_uuid } = req;
    const { appId } = req?.params;

    //user
    const user = await User.findOne({ _uuid: auth_uuid });

    if (!user) {
        res.status(404).json({ message: 'User Not found!', data: false });
    }

    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const requests = await Request.find({ user_id: user?._id, createdAt: { $gte: twentyFourHoursAgo }, application: appId });

        res.json({ message: "ok", requests });
    } catch (error) {
        res.status(500).json({ message: error.message, data: false });
    }
};

// Controller function to get requests within the last 7 days
exports.getRequestsLast7Days = async (req, res) => {


    const { auth_uuid } = req;
    const { appId } = req?.params;

    //user
    const user = await User.findOne({ _uuid: auth_uuid });

    if (!user) {
        res.status(404).json({ message: 'User Not found!', data: false });
    }

    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const requests = await Request.find({ user_id: user?._id, createdAt: { $gte: sevenDaysAgo }, application: appId });
        res.json({ message: "ok", requests });
    } catch (error) {
        res.status(500).json({ message: error.message, data: false });
    }
};

// Controller function to get requests within the last 30 days
exports.getRequestsLast30Days = async (req, res) => {


    const { auth_uuid } = req;

    const { appId } = req?.params;

    //user
    const user = await User.findOne({ _uuid: auth_uuid });

    if (!user) {
        res.status(404).json({ message: 'User Not found!', data: false });
    }

    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const requests = await Request.find({ user_id: user?._id, createdAt: { $gte: thirtyDaysAgo }, application: appId });
        res.json({ message: "ok", requests });
    } catch (error) {
        res.status(500).json({ message: error.message, data: false });
    }
};

// Controller function to get requests within the last 12 months
exports.getRequestsLast12Months = async (req, res) => {


    const { auth_uuid } = req;

    const { appId } = req?.params;


    //user
    const user = await User.findOne({ _uuid: auth_uuid });

    if (!user) {
        res.status(404).json({ message: 'User Not found!', data: false });
    }

    try {
        const twelveMonthsAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        const requests = await Request.find({ user_id: user?._id, createdAt: { $gte: twelveMonthsAgo }, application: appId });
        res.json({ message: "ok", requests });
    } catch (error) {
        res.status(500).json({ message: error.message, data: false });
    }
};
