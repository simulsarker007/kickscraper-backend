
const { mongoose } = require('../utils/monogoUtils');


const SubscriptionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        period: String,
        price: String,
        price_cycle: String,
    },
    {
        timestamps: true
    }
);



const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
