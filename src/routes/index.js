const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const publicRoutes = require('./publicRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/detector', publicRoutes);


module.exports = router;
