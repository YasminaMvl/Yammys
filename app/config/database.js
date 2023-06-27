const { Sequelize } = require('sequelize');

require('dotenv').config();

//connexion à la BDD

const sequelize = new Sequelize(process.env.PG_URL, {

    define: {
        // Transformer tous les noms des colonnes du camelCase vers snake_case
        underscored: true,
    }

});

// Test the database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection  successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
