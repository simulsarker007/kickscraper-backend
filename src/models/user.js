const { v4: uuidv4 } = require('uuid');
const { mongoose } = require('../utils/monogoUtils');



const UserSchema = new mongoose.Schema({
    _uuid: { type: String, unique: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    avatar: String,
    emailConfirmedAt: String,
    password: String,
    job_level: { type: String, required: false },
    job_function: { type: String, required: false },
    timezone: { type: String, required: false },
});

// Generate a unique token before saving the user (only when creating a new user)
UserSchema.pre('save', function (next) {
    const user = this;

    // Generate a unique token (UUID) only when creating a new user
    if (!user.isNew || user._uuid) {
        return next();
    }

    user._uuid = uuidv4();

    next();
});

// Exclude the password field when converting the user to JSON
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
