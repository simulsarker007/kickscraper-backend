const { mongoose } = require('../utils/monogoUtils');

const NewsletterSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
    },
    {
        timestamps: true
    }
);

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = Newsletter;
