const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', recipeController.getAllRecipes);
router.post('/', authMiddleware.authenticateUser, recipeController.createRecipe);
// Create a new recipe
router.post('/recipes', recipeController.createRecipe);
// Get a specific recipe
router.get('/recipes/:id', recipeController.getRecipe);
router.get('/:id', recipeController.getRecipe);
//Create a recipe
router.get('/create', recipeController.renderCreateForm);
router.post('/create', recipeController.createRecipe);
//  suppression de recette
router.delete('/:id', authMiddleware.authenticateUser, recipeController.deleteRecipe);


module.exports = router;
