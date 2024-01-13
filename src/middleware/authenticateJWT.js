const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.auth_uuid = data?.auth_uuid;
        next();
    });
};

module.exports = authenticateJWT;
