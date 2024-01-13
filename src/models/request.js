const { mongoose } = require('../utils/monogoUtils');


const RequestSchema = new mongoose.Schema({
    api_key: { type: String, required: true },
    app_id: { type: String, required: true },
    user_id: { type: String, required: true },
    visit_uuid: { type: String, required: true },
    incognito_mode: String,
    vpn: String,
    bot: { type: String, required: false },
    kicked_bot: { type: String, required: false },
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
    request: String
});



const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
