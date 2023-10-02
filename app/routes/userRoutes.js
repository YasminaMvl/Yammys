const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importez le middleware d'authentification



// Définition d'une route GET pour '/profile'. Lorsqu'un client envoie une requête GET à '/profile', la fonction de rappel (callback) spécifiée est exécutée.
router.get('/profile', authMiddleware.authenticateUser, (req, res) => {
    // Vous pouvez accéder à l'utilisateur authentifié via req.user ici.
    res.render('profile', { title: 'Mon profil', user: req.session.user, session: req.session });
});


router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);





module.exports = router;
