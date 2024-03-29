
const { mongoose } = require('../utils/monogoUtils');


const ApplicationSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        name: { type: String, required: true },
        domain: String,
        domain_icon: String,
        subscription: { type: String, required: true },
        status: { type: String, required: true, default: 'active' },
        verified: { type: Boolean, required: true, default: false },
        endAt: { type: Date, required: false },
        cancelAt: { type: Date, required: false },
    },
    {
        timestamps: true
    }
);



const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
