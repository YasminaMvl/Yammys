const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Recipe = require('./Recipe');

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

Favorite.belongsTo(User);
Favorite.belongsTo(Recipe);

module.exports = Favorite;
