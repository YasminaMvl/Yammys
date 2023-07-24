const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Définition d'une route GET pour '/profile'. Lorsqu'un client envoie une requête GET à '/profile', la fonction de rappel (callback) spécifiée est exécutée.
router.get('/profile', (req, res) => {

    // Vérification de l'état de connexion de l'utilisateur. Si l'utilisateur n'est pas connecté (c'est-à-dire si req.session.isLoggedIn est false ou non défini), alors...
    if (!req.session.isLoggedIn) {

        // ...l'utilisateur est redirigé vers la page de connexion ('/auth/login').
        return res.redirect('/auth/login');
    }

    // Si l'utilisateur est connecté, alors la page de profil est rendue. La méthode 'render' prend deux arguments :
    // - le nom de la vue à rendre (dans ce cas, 'profile')
    // - un objet contenant les variables locales à passer à la vue. Ici, nous passons le titre de la page ('Mon profil'), les informations de l'utilisateur (req.session.user) et l'objet de session complet (req.session).
    res.render('profile', { title: 'Mon profil', user: req.session.user, session: req.session });
});


router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);





module.exports = router;
