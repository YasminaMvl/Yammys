const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to verify user authentication
function authenticateUser(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    authenticateUser,
};
