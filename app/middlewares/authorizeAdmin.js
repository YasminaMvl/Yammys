const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const session = require('express-session');

function authorizeAdmin(req, res, next) {
    const token = req.cookies ? req.cookies.token : null;
    console.log("Token received in middleware:", token); // log the token

    if (!token) {
        console.log("No token found. Redirecting to /admin/login.");
        return res.status(401).redirect('/admin/login');
    }

    jwt.verify(token, config.secretKey, async (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).redirect('/admin/login');
        }

        try {
            const admin = await User.findByPk(decoded.id);
            console.log('Admin found:', admin); // Log the found admin

            if (!admin || !admin.isAdmin) {
                console.log('Not an admin user. Redirecting to /admin/login.');
                return res.status(403).redirect('/admin/login');
            }

            req.admin = admin; // Add admin to request object
            req.session.isAdmin = true;  // <-- Ajoutez cette ligne ici
            console.log('Admin in middleware:', req.admin); // Log the admin object
            next();
        } catch (error) {
            console.error('Error in authorizeAdmin:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}


module.exports = authorizeAdmin;
