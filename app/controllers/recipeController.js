const User = require('../models/User');
const Recipe = require('../models/Recipe');



// Récupérer une recette spécifique
async function getRecipe(req, res) {
  try {
    // Récupérer l'ID de la recette à partir de la requête
    const id = parseInt(req.params.id);

    // Vérifier si l'ID de la recette est un entier valide
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
    // Les instructions seront divisées en un tableau où chaque élément est une instruction, 
    // et les espaces supplémentaires seront supprimés
    const instructionsArray = recipe.instructions.split('.').map(instruction => instruction.trim());


    // Render the 'recipe' view and pass the recipe, ingredientsArray, and instructionsArray to the view
    res.render('recipe', {
      title: 'Recipe Details', // Vous pouvez personnaliser le titre ici
      recipe: recipe,
      ingredientsArray: ingredientsArray,
      instructionsArray: instructionsArray,
    });
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

    // Définir la variable admin à true si req.admin existe et est un administrateur, sinon à false
    const admin = req.admin && req.admin.isAdmin ? true : false;

    // Log la variable admin
    console.log('admin in controller:', admin);

    // Rendre la vue avec les recettes et la variable admin
    res.render('recipes', { recipes: recipes, admin: admin });

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

    if (req.session && req.session.isAdmin) {
      return res.redirect('/admin/adminProfile');
    } else {
      return res.redirect('/users/profile');
    }
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et envoyer une réponse d'erreur
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

    res.redirect('/admin/adminProfile');
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

};
