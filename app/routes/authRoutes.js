const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Affichage du formulaire d'inscription
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Traitement du formulaire d'inscription (réception des données et appel de la fonction registerUser du contrôleur)
router.post('/register', authController.registerUser);

// Affichage du formulaire de connexion
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Traitement du formulaire de connexion (réception des données et appel de la fonction loginUser du contrôleur)
router.post('/login', authController.loginUser);

module.exports = router;
