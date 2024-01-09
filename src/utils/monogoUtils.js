const { default: mongoose } = require("mongoose");

// utils.js
const timestampPlugin = function (schema, options) {
    schema.add({
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    });

    schema.pre('save', function (next) {
        this.updated_at = new Date();
        next();
    });

    if (options && options.index) {
        schema.path('created_at').index(options.index);
        schema.path('updated_at').index(options.index);
    }
};

mongoose.plugin(timestampPlugin, { index: true });

module.exports = {
    mongoose
};
