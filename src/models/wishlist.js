const { mongoose } = require('../utils/monogoUtils');

const WishlistSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
    },
    {
        timestamps: true
    }
);

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;
