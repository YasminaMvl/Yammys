const express = require('express');
const app = express();

// Configuration
const config = require('./config/config');
require('./config/database');

// Middlewares
const middleware = require('./config/middleware');
app.use(middleware.session);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
