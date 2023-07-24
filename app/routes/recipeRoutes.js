const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');

// Définir les routes pour les recettes
router.get('/', recipeController.getAllRecipes); // Récupérer toutes les recettes
router.post('/', authMiddleware.authenticateUser, recipeController.createRecipe); // Créer une nouvelle recette
router.get('/:id', recipeController.getRecipe); // Récupérer une recette spécifique
router.get('/create', recipeController.renderCreateForm); // Afficher le formulaire de création de recette
router.post('/create', recipeController.createRecipe); // Créer une nouvelle recette
router.delete('/:id', authMiddleware.authenticateUser, recipeController.deleteRecipe); // Supprimer une recette

// Exporter le routeur
module.exports = router;
