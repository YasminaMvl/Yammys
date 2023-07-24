const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Register a new user
async function registerUser(req, res) {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        console.log('Existing user:', existingUser);
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({ username, password: hashedPassword });
        console.log('New user:', newUser);

        // Generate JWT token
        const token = jwt.sign({ id: newUser.id }, config.secretKey);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Login user
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ where: { username } });
        console.log('User:', user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }



        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, config.secretKey);

        res.json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
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

// Hash and store passwords for all users
async function hashAndStorePasswords() {
    const users = await User.findAll();

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
    }

    console.log('All passwords have been hashed and stored.');
}

// Call the function to hash and store passwords
hashAndStorePasswords();

module.exports = {
    registerUser,
    loginUser,
    updateUser,
};
