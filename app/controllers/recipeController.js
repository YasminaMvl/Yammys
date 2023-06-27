const Recipe = require('../models/Recipe');

// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.findAll();
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
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error getting recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
};
