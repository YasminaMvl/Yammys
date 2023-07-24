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

        // Redirect to login page
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Login user
async function loginUser(req, res) {
    console.log('Starting loginUser function');
    try {
        const { username, password } = req.body;
        console.log(`Received username: ${username} and password: ${password}`);

        // Find the user
        console.log('Attempting to find user in database');
        const user = await User.findOne({ where: { username } });
        console.log('User:', user);
        if (!user) {
            console.log('User not found in database');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        console.log('User found, comparing passwords');
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', passwordMatch);
        if (!passwordMatch) {
            console.log('Passwords do not match');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // User is logged in, update session
        console.log('Passwords match, updating session and redirecting to profile');
        req.session.isLoggedIn = true;
        req.session.user = user;

        res.redirect('/users/profile');
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
