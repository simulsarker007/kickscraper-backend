const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/login/google', authController.googleAuth);

router.post('/join/wishlist', authController.joinWishlist);
router.post('/join/newsletter', authController.joinNewsletter);

module.exports = router;
