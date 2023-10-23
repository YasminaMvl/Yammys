const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware.authenticateUser, (req, res) => {
    // Récupére les informations de l'utilisateur authentifié depuis la session ou d'où elles proviennent
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'No user found' });
    }

    res.render('profile', { user: req.user });
});

// Route pour afficher le formulaire d'ajout de recette
router.get('/create', authMiddleware.authenticateUser, (req, res) => {
    try {
        if (!req.user) throw new Error('User not found');

        res.render('create', { title: 'Ajouter une recette' });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Internal server error');
    }
});


router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


router.get('/logout', authController.logout);


module.exports = router;
