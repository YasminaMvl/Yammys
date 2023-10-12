const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticateUser(req, res, next) {
    console.log("Middleware authenticateUser appelé."); // Ajouté pour le débogage
    const token = req.cookies.token;

    if (!token) {
        console.log('Aucun token fourni.');  // Ajouté pour le débogage
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            console.log("Erreur lors de la vérification du token:", err);  // Ajouté pour le débogage

            if (err.name === 'TokenExpiredError') {
                console.log("Le token a expiré.");  // Ajouté pour le débogage
                return res.status(401).json({ message: 'Token expired' });
            }

            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        console.log('Utilisateur authentifié :', req.user);  // Ajouté pour le débogage
        next();
    });
}

module.exports = {
    authenticateUser,
};
