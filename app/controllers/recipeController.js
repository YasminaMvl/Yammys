const User = require('../models/User');
const Recipe = require('../models/Recipe');





// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User, as: 'user' }],
      // Inclure la relation 'user' lors de la récupération des recettes
    });
    res.json(recipes);
  } catch (error) {
    console.error('Error getting recipes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Create a new recipe
async function createRecipe(req, res) {
  try {
    const { title, ingredients, instructions } = req.body;

    // Create the new recipe
    const newRecipe = await Recipe.create({ title, ingredients, instructions });

    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get a specific recipe
async function getRecipe(req, res) {
  try {
    const { id } = req.params;

    // Find the recipe
    const recipe = await Recipe.findByPk(id, {
      include: [{ model: User, as: 'user' }],
      // Inclure la relation 'user' lors de la récupération de la recette
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error getting recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Render the create recipe form
function renderCreateForm(req, res) {
  res.render('create', { title: 'Create Recipe' });
}

// Delete a recipe by ID
async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;

    // Find the recipe by ID
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Delete the recipe
    await recipe.destroy();

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  renderCreateForm,
};
