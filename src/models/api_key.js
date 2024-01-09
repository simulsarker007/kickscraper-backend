
const { mongoose } = require('../utils/monogoUtils');

const ApiKeySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    app_id: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    type: { type: String, required: true }, //public, secret, proxy
    rate_limit: String,
    is_active: { type: String }, // yes or no
});



const ApiKey = mongoose.model('Api_Key', ApiKeySchema);

module.exports = ApiKey;
