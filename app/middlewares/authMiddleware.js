const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticateUser(req, res, next) {
    // Vérifier si un cookie de session existe (pour la compatibilité avec les anciennes sessions)
    if (req.session && req.session.isLoggedIn) {
        // L'utilisateur est authentifié via un cookie, vous pouvez continuer à utiliser cela si nécessaire.
        next();
    } else {
        // Vérifier si un token JWT est fourni dans les en-têtes de la requête
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            // Le token est valide, vous pouvez stocker les informations de l'utilisateur dans req.user
            req.user = decoded;
            next();
        });
    }
}

module.exports = {
    authenticateUser,
};
