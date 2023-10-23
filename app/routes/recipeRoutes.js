const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({ storage: storage })

const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');


// Définir les routes pour les recettes
router.get('/recipes', authMiddleware.authenticateUser, authorizeAdmin, recipeController.getAllRecipes);
router.get('/', recipeController.getAllRecipes); // Récupérer toutes les recettes
router.post('/', authMiddleware.authenticateUser, upload.single('image'), recipeController.createRecipe); // Créer une nouvelle recette avec téléchargement d'image
router.get('/:id', recipeController.getRecipe); // Récupérer une recette spécifique
router.get('/create', authMiddleware.authenticateUser, recipeController.createRecipe); // Afficher le formulaire de création de recette
router.post('/create', authMiddleware.authenticateUser, upload.single('image'), recipeController.createRecipe);
router.delete('/:id', authMiddleware.authenticateUser, recipeController.deleteRecipe); // Supprimer une recette

// Exporter le routeur
module.exports = router;
