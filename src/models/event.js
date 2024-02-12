const { mongoose } = require('../utils/monogoUtils');


const EventSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        app_id: { type: String, required: true },
        requestID: { type: String, required: true },
        visitorID: String,
        linkedID: { type: String, required: false },
        incognito_mode: String,
        vpn: String,
        bot: { type: String, required: false },
        browser_tampering: { type: String, required: false },
        virtual_machine: { type: String, required: false },
        privacy_setting: { type: String, required: false },
        request: String
    },
    {
        timestamps: true
    }
);



const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
