const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'static/views');

app.use(express.static('static'));

const config = require('./app/config/config'); // Importation de la configuration
require('./app/config/database');

app.use(session({
    secret: config.secretKey, // Utilisation de la clé secrète définie dans la configuration
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

const middleware = require('./app/config/middleware');
app.use(middleware.session);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require('./app/routes/authRoutes');
const recipeRoutes = require('./app/routes/recipeRoutes');
const userRoutes = require('./app/routes/userRoutes');
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
