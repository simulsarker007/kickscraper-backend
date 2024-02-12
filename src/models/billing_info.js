
const { mongoose } = require('../utils/monogoUtils');


const BillingInfoSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        app_id: { type: String, required: true },
        name: String,
        email: String,
        address: { type: String, required: false },
        country: String,
        state: String,
        city: { type: String, required: false },
        zip: { type: String, required: false },
        tax_type: { type: String, required: false },
        tax_id: { type: String, required: false },
    },
    {
        timestamps: true
    }
);



const BillingInfo = mongoose.model('Billing_Info', BillingInfoSchema);

module.exports = BillingInfo;
