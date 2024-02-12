
const { mongoose } = require('../utils/monogoUtils');
const crypto = require('crypto')

const ApiKeySchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        app_id: { type: String, required: true },
        name: { type: String, required: true },
        description: String,
        type: { type: String, required: true }, //public, secret, proxy
        rate_limit: String,
        is_active: { type: String }, // yes or no
        key: {
            type: String,
            required: true,
            unique: true,
            default: () => crypto.randomBytes(64).toString('hex')
        }
    },
    {
        timestamps: true
    }
);



const ApiKey = mongoose.model('Api_Key', ApiKeySchema);

module.exports = ApiKey;
