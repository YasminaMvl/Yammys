const express = require('express');
const router = express.Router();
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const authController = require('../controllers/authController');
const User = require('../models/User'); // ajustez le chemin si nécessaire


router.get('/login', (req, res) => {
    res.render('adminLogin', { title: 'Admin Login' });
});

router.post('/login', authController.loginAdmin);

router.get('/adminProfile', authorizeAdmin, (req, res) => {
    try {
        if (!req.admin) throw new Error('Admin not found');
        res.render('adminProfile', { title: 'Admin Profile', user: req.admin }); // Pass admin as user to the view
    } catch (error) {
        console.error('Error retrieving admin:', error);
        res.status(500).send('Internal server error');
    }
});





router.get('/register', (req, res) => {
    res.render('adminRegister', { title: 'Admin Register' });
});

router.post('/register', authController.registerAdmin);




module.exports = router;
