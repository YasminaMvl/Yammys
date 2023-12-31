const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');


const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false,

    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Recipe.belongsTo(User, { as: 'user', foreignKey: 'userId' });

module.exports = Recipe;
