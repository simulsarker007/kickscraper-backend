const { mongoose } = require('../utils/monogoUtils');


const VisitSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        app_id: { type: String, required: true },
        visitorId: { type: String, required: true },
        requestId: String,
        browserDetails: { type: Object, required: false },
        incognito: String,
        ip: String,
        ipLocation: { type: Object, required: false },
        url: { type: String, required: false },
        visitorFound: { type: String, required: false },
    },
    {
        timestamps: true
    }
);


// Generate a unique token before saving the user (only when creating a new user)
VisitSchema.pre('save', function (next) {
    const visit = this;

    // Generate a unique token (UUID) only when creating a new visit
    if (!visit.isNew || visit.visitorId) {
        return next();
    }

    visit.visitorId = uuidv4();

    next();
});



const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;
