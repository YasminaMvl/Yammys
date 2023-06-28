const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session');
const moment = require('moment');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views')); // Mettez à jour le chemin du dossier des vues

app.use(express.static(__dirname + '/static'));

const config = require('./app/config/config');
require('./app/config/database');

app.use(session({
    secret: config.secretKey,
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
    res.render('layout', { title: ' home page!' });
});
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.created_at = moment().format();
    } else if (req.method === 'PUT') {
        req.body.updated_at = moment().format();
    }
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
