const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/profile', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }

    res.render('profile', { title: 'Mon profil', user: req.session.user });
});

router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);





module.exports = router;
