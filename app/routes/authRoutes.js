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

// Exemple de route de connexion
//app.post('/login', (req, res) => {
// Vérifiez les informations d'identification de l'utilisateur (omis pour la simplicité)
//const user = { id: 1, username: 'john123' }; // Remplacez par les données de l'utilisateur authentifié

// Définir des valeurs dans la session pour indiquer qu'un utilisateur est connecté
//req.session.userId = user.id;
//req.session.username = user.username;

// Rediriger l'utilisateur vers une page après la connexion (par exemple, la page de profil)
//res.redirect('/profile');
//});


// Traitement du formulaire de connexion (réception des données et appel de la fonction loginUser du contrôleur)
router.post('/login', authController.loginUser);

module.exports = router;
