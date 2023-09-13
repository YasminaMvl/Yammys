const User = require('../models/User');
const Recipe = require('../models/Recipe');


// Récupérer une recette spécifique
// Récupérer une recette spécifique
async function getRecipe(req, res) {
  try {
    // Récupérer l'ID de la recette à partir de la requête
    const id = parseInt(req.params.id);

    // Vérifier si l'ID  de la recette est un entier valide
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    // Trouver la recette dans la base de données
    const recipe = await Recipe.findByPk(id, {
      include: [{ model: User, as: 'user' }],
      attributes: ['id', 'title', 'ingredients', 'instructions', 'image'],
    });

    // Si la recette n'est pas trouvée, envoyer une réponse d'erreur
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Traiter les ingrédients en tant que texte brut et les diviser en un tableau
    const ingredientsArray = recipe.ingredients.split(',');

    // Traiter les instructions en tant que texte brut et les diviser en un tableau
    const instructionsArray = recipe.instructions.split('\n');

    // Render the 'recipe' view and pass the recipe, ingredientsArray, and instructionsArray to the view
    res.render('recipe', { recette: recipe, ingredientsArray: ingredientsArray, instructionsArray: instructionsArray });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et envoyer une réponse d'erreur
    console.error('Error getting recipe:', error);
    res.status(500).render('500', { message: 'Internal server error' });
  }
}






// Récupérer toutes les recettes
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User, as: 'user' }],
    });
    res.render('recipes', { recipes: recipes });
  } catch (error) {
    console.error('Error getting recipes:', error);
    res.status(500).render('500', { message: 'Internal server error' });
  }
}
//  Fonction pour Recettes aléatoires



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
    const user = req.session.user; // Assumons que l'utilisateur est stocké dans la session

    // Vérifier si l'utilisateur est un administrateur
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Trouver la recette par ID
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Supprimer la recette
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
