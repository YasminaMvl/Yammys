const express = require('express');
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
const config = require('./app/config/config');
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
app.get('/', (req, res) => {
    const recipes = [];
    res.render('home', { title: 'Home page!', session: req.session, recipes: recipes });
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
