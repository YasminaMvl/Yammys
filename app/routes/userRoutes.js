const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importez le middleware d'authentification

router.get('/profile', authMiddleware.authenticateUser, (req, res) => {
    // Récupérez les informations de l'utilisateur authentifié depuis la session ou d'où elles proviennent
    const user = req.user; // Assurez-vous que req.user est correctement défini

    if (!user) {
        return res.status(401).json({ message: 'No user found' });
    }

    res.render('profile', { title: 'Mon profil', user }); // Passez l'objet user au modèle EJS
});


router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
