const User = require('../models/User');
const bcrypt = require('bcrypt');


// Get user by ID
async function getUser(req, res) {
    try {
        const { id } = req.params;

        // Ajout de la validation pour vérifier si l'ID est un entier
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID should be an integer" });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Vérifier si l'utilisateur est un administrateur
async function isAdmin(req, res) {
    try {
        // Rechercher l'utilisateur par son identifiant
        const foundUser = await User.findOne({
            where: {
                id: req.body.userId
            }
        });

        if (foundUser) {
            const userData = {
                isAdmin: foundUser.dataValues.isAdmin
            };
            return res.status(200).json(userData);
        } else {
            return res.status(401).json({ errorMessage: "User not found" });
        }
    } catch (error) {
        res.json(error);
    }
}

// Update user
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete user
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUser,
    isAdmin,
    updateUser,
    deleteUser,
};
