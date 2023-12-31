const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes pour les utilisateurs
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', authController.registerUser);

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', authController.loginUser);

router.get('/logout', authController.logout)
module.exports = router;
