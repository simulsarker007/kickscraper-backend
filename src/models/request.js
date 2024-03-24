const { Schema } = require('mongoose');
const { mongoose } = require('../utils/monogoUtils');


const RequestSchema = new mongoose.Schema(
    {
        api_key: { type: Schema.ObjectId, ref: 'Api_Key', required: true },
        application: { type: Schema.ObjectId, ref: 'Application', required: true },
        user_id: { type: Schema.ObjectId, ref: 'User', required: true },
        visit_id: { type: String, required: true },
        incognito_mode: String,
        bot: { type: String, required: false },
        kicked_bot: { type: String, required: false },
        botKind: { type: String, required: false, default: false },
        collectionTime: { type: String, required: false },
        android: { type: String, required: false },
        browserKind: { type: String, required: false },
        browserEngineKind: { type: String, required: false },
        userAgent: { type: String, required: false },
        appVersion: { type: String, required: false },
        traffic_source: { type: String, required: false },
        current_page: { type: String, required: false },
        country: { type: String, required: false },
        city: { type: String, required: false },
        platform: { type: String, required: false },
        device: { type: String, required: false },
        captcha_status: { type: String, required: true, default: 'not_showed' },
        request: String
    },
    {
        timestamps: true
    }
);



const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
