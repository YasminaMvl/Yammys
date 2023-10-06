const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Enregistrement d'un nouvel utilisateur
async function registerUser(req, res) {
    try {
        const { username, password } = req.body;

        // Vérifier si le nom d'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Nom d\'utilisateur déjà existant' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const newUser = await User.create({ username, password: hashedPassword });

        // Rediriger vers la page de connexion
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

// Connexion de l'utilisateur
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        // Trouver l'utilisateur
        const user = await User.findOne({ where: { username, isAdmin: false } });

        if (!user) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Comparer les mots de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // L'utilisateur est connecté, générer un jeton
        const token = jwt.sign({ id: user.id }, config.secretKey, {
            expiresIn: '1h', // Le jeton expirera en 1 heure
        });
        // Définir le jeton en tant que cookie 
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });

        // Rediriger vers la page de profil pour ajouter une recette
        res.redirect('/users/profile');
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

// Fonction pour enregistrer un nouvel admin
async function registerAdmin(req, res) {
    try {
        const { username, password } = req.body;

        // Vérifier si le nom d'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Nom d\'utilisateur déjà existant' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur en tant qu'admin
        const newUser = await User.create({ username, password: hashedPassword, isAdmin: true });

        // Rediriger vers la page de connexion admin
        res.redirect('/admin/login');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'admin :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

// Connexion de l'admin
async function loginAdmin(req, res) {
    try {
        const { username, password } = req.body;

        // Trouver l'admin
        const user = await User.findOne({ where: { username, isAdmin: true } });

        if (!user) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Comparer les mots de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Générer un jeton et définir un cookie pour l'admin
        const token = jwt.sign({ id: user.id }, config.secretKey, {
            expiresIn: 86400, // Le jeton expirera en 24 heures
        });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });

        // Rediriger vers le profil de l'admin
        res.redirect('/admin/adminProfile');
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'admin :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

// Mise à jour de l'utilisateur
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        user.username = username;

        // Hacher le nouveau mot de passe avant de le sauvegarder
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

// Fonction pour hacher et stocker les mots de passe de tous les utilisateurs
async function hashAndStorePasswords() {
    try {
        const users = await User.findAll();
        let alreadyHashedCount = 0;

        for (let user of users) {
            // Vérifier si le mot de passe est déjà haché
            if (user.password.length === 60) {
                alreadyHashedCount++;
                continue; // Passer à l'itération suivante
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        }

        console.log(`${alreadyHashedCount} mots de passe étaient déjà hachés.`);
        console.log('Tous les mots de passe nécessaires ont été hachés et stockés.');
    } catch (error) {
        console.error('Erreur dans hashAndStorePasswords :', error);
    }
}

// Appeler la fonction pour hacher et stocker les mots de passe
try {
    hashAndStorePasswords();
} catch (error) {
    console.error('Erreur lors de l\'appel de hashAndStorePasswords :', error);
}

module.exports = {
    registerAdmin,
    loginAdmin,
    registerUser,
    loginUser,
    updateUser,
};
