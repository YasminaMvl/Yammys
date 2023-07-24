const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session');
const moment = require('moment');

// Middleware for parsing incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des vues EJS
app.set('view engine', 'ejs');
app.set('views', './app/static/views'); //  chemin du dossier des vues

// Middleware pour les fichiers statiques
app.use(express.static(__dirname + '/app/static'));


// Configuration de la session
const config = require('./app/config/config');
require('./app/config/database');

app.use(session({
    secret: config.secretKey,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000 // Durée de validité du cookie de session : 1 heure (en millisecondes)
    }
}));

// Middleware personnalisé pour la session
const middleware = require('./app/config/middleware');
app.use(middleware.session);

// Middleware pour le parsing des données (URL-encoded et JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importation des routes
const authRoutes = require('./app/routes/authRoutes');
const recipeRoutes = require('./app/routes/recipeRoutes');
const userRoutes = require('./app/routes/userRoutes');

// Route d'accueil
app.get('/profile', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }

    res.render('profile', { title: 'Mon profil', user: req.session.user, session: req.session });
});

//session qui renvoie la page Mon profile apres connexion



// Utilisation des routes d'authentification, recettes et utilisateurs
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

// Middleware pour ajouter automatiquement la date de création ou de mise à jour
app.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.created_at = moment().format(); // Ajoute la date de création avant une requête POST
    } else if (req.method === 'PUT') {
        req.body.updated_at = moment().format(); // Ajoute la date de mise à jour avant une requête PUT
    }
    next();
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
