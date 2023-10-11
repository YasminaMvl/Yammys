const express = require('express');
const router = express.Router();
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const authController = require('../controllers/authController');
const User = require('../models/User');
const Recipe = require('../models/Recipe'); // ajustez le chemin si nécessaire
const recipeController = require('../controllers/recipeController'); // ajustez le chemin si nécessaire






router.get('/login', (req, res) => {
    res.render('adminLogin', { title: 'Admin Login' });
});

router.post('/login', authController.loginAdmin);

router.get('/adminProfile', authorizeAdmin, async (req, res) => {
    try {
        if (!req.admin) throw new Error('Admin not found');

        // Récupérez la liste des utilisateurs depuis votre base de données
        const users = await User.findAll();

        // Récupérez la liste des recettes depuis votre base de données
        const recipes = await Recipe.findAll();

        res.render('adminProfile', {
            title: 'Admin Profile',
            users: users,
            recipes: recipes,

        });
    } catch (error) {
        console.error('Error retrieving admin:', error);
        res.status(500).send('Internal server error');
    }
});

// Route pour afficher le formulaire d'ajout de recette
router.get('/addRecipeForm', authorizeAdmin, (req, res) => {
    try {
        if (!req.admin) throw new Error('Admin not found');

        res.render('addRecipeForm', { title: 'Ajouter une recette' });
    } catch (error) {
        console.error('Error retrieving admin:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/register', (req, res) => {
    res.render('adminRegister', { title: 'Admin Register' });
});

router.post('/register', authController.registerAdmin);

// Route pour supprimer un utilisateur (protegée pour les administrateurs)
router.post('/deleteUser', authorizeAdmin, async (req, res) => {
    try {
        const { userId } = req.body;

        // Utilisez la méthode destroy pour supprimer l'utilisateur de la base de données
        const result = await User.destroy({
            where: {
                id: userId
            }
        });

        // Vérifiez le résultat de la suppression
        if (result === 1) {
            // L'utilisateur a été supprimé avec succès
            return res.redirect('/admin/adminProfile');
        } else {
            // Aucun utilisateur n'a été supprimé (peut-être que l'ID de l'utilisateur était incorrect)
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route pour supprimer une recette (protegée pour les administrateurs)
router.post('/deleteRecipe', authorizeAdmin, async (req, res) => {
    try {
        const { recipeId } = req.body;

        // Utilisez la méthode destroy pour supprimer la recette de la base de données
        const result = await Recipe.destroy({
            where: {
                id: recipeId
            }
        });

        // Vérifiez le résultat de la suppression
        if (result === 1) {
            // La recette a été supprimée avec succès
            return res.redirect('/admin/adminProfile');
        } else {
            // Aucune recette n'a été supprimée (peut-être que l'ID de la recette était incorrect)
            return res.status(400).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/logout', authController.logout);


module.exports = router;
