const User = require('../models/User');
const Recipe = require('../models/Recipe');


// Récupérer une recette spécifique
async function getRecipe(req, res) {
  try {
    // Récupérer l'ID de la recette à partir de la requête
    const { id } = req.params;

    // Trouver la recette dans la base de données
    const recipe = await Recipe.findByPk(id, {
      include: [{ model: User, as: 'user' }],
      attributes: ['id', 'title', 'ingredients', 'instructions', 'image'],
    });

    // Si la recette n'est pas trouvée, envoyer une réponse d'erreur
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Render the 'recipe' view and pass the recipe to the view
    res.render('recipe', { recette: recipe });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et envoyer une réponse d'erreur
    console.error('Error getting recipe:', error);
    res.status(500).render('500', { message: 'Internal server error' });
  }
}

// Récupérer toutes les recettes
async function getAllRecipes(req, res) {
  try {
    // Récupérer toutes les recettes de la base de données
    // Inclure l'utilisateur associé à chaque recette
    const recipes = await Recipe.findAll({
      include: [{ model: User, as: 'user' }],
    });

    // Render the 'recipes' view and pass the recipes to the view
    res.render('recipes', { recettes: recipes });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et envoyer une réponse d'erreur
    console.error('Error getting recipes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Créer une nouvelle recette
async function createRecipe(req, res) {
  try {
    // Récupérer les données de la recette à partir de la requête
    const { title, ingredients, instructions, image } = req.body;

    // Créer la nouvelle recette dans la base de données
    const newRecipe = await Recipe.create({ title, ingredients, instructions, image });

    // Envoyer une réponse indiquant que la recette a été créée avec succès
    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et envoyer une réponse d'erreur
    console.error('Error creating recipe:', error);
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
