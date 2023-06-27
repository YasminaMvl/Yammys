const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'static/views');

app.use(express.static('static'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

// Configuration
const config = require('./app/config/config');
require('./app/config/database');

// Middlewares
const middleware = require('./app/config/middleware');
app.use(middleware.session);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const authRoutes = require('./app/routes/authRoutes');
const recipeRoutes = require('./app/routes/recipeRoutes');
const userRoutes = require('./app/routes/userRoutes');
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
