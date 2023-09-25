const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

function authorizeSuperAdmin(req, res, next) {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).redirect('/admin/login');
    }

    jwt.verify(token, config.secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).redirect('/admin/login');
        }

        try {
            const user = await User.findByPk(decoded.id);

            if (!user || !user.isSuperAdmin) {
                return res.status(403).json({ message: 'Forbidden: You do not have enough privileges' });
            }

            next();
        } catch (error) {
            console.error('Error in authorizeSuperAdmin:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}

module.exports = authorizeSuperAdmin;
