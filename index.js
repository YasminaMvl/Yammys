const express = require('express');
const sequelize = require('./app/config/database');

require('dotenv').config();

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');


// Middleware pour le parsing des données (URL-encoded et JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des vues EJS
app.set('view engine', 'ejs');
app.set('views', './app/static/views');

// Middleware pour les fichiers statiques
app.use(express.static(__dirname + '/app/static'));


// Utilisez cookie-parser
app.use(cookieParser());

// Configuration de la session
const config = require('./app/config/config'); // Déplacez cette ligne ici

// Utilisez express-session avec les options configurées
app.use(session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000 // 1 heure
    }
}));


require('./app/config/database');


// Middleware personnalisé pour la session
const middleware = require('./app/config/middleware');
app.use(middleware.session);

// Middleware pour ajouter automatiquement la date de création ou de mise à jour
app.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.created_at = moment().format();
    } else if (req.method === 'PUT') {
        req.body.updated_at = moment().format();
    }
    next();
});

//Importation de model

const Recipe = require('./app/models/Recipe');

// Importation des routes
const authRoutes = require('./app/routes/authRoutes');
const recipeRoutes = require('./app/routes/recipeRoutes');
const userRoutes = require('./app/routes/userRoutes');
const adminRoutes = require('./app/routes/adminRoutes');

// Utilisation des routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Route d'accueil
app.get('/', async (req, res) => {
    try {
        // Récupérer 6 recettes aléatoires depuis la base de données (exemple avec Sequelize)
        const recipes = await Recipe.findAll({
            order: sequelize.random(),
            limit: 6,
        });

        // Transmettre les recettes à la vue EJS
        res.render('home', {
            title: 'Home page!',
            admin: req.admin && req.admin.isAdmin ? true : false,
            session: req.session,
            recipes: recipes,
        });
    } catch (error) {
        console.error('Error retrieving random recipes:', error);
        res.status(500).send('Internal server error');
    }
});


// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
