const { mongoose } = require('../utils/monogoUtils');

const PaymentMethodSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        card_name: String,
        card_number: String,
        card_exp_date: String,
        card_cvv: String,
    },
    {
        timestamps: true
    }
);



const PaymentMethod = mongoose.model('Payment_Method', PaymentMethodSchema);

module.exports = PaymentMethod;
