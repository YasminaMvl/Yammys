const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticateUser(req, res, next) {
    // Vérifier si un token JWT est fourni dans les en-têtes de la requête
    const token = req.cookies.token;

    if (!token) {
        console.log('Aucun token fourni.');
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            console.log('Token invalide :', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Le token est valide, vous pouvez stocker les informations de l'utilisateur dans req.user
        req.user = decoded;
        console.log('Utilisateur authentifié :', req.user);
        next();
    });
}

module.exports = {
    authenticateUser,
};