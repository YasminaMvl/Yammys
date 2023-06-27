const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', recipeController.getAllRecipes);
router.post('/', authMiddleware.authenticateUser, recipeController.createRecipe);
router.get('/:id', recipeController.getRecipe);

module.exports = router;