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


    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ where: { username, isAdmin: false } }); // Check if it is a normal user
        console.log('username:', username);
        console.log('password:', password);
        console.log('user found:', user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // User is logged in, update session
        req.session.isLoggedIn = true;
        req.session.user = user;

        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Fonction pour enregistrer un nouvel admin
async function registerAdmin(req, res) {
    try {
        const { username, password } = req.body;

        // Vérifier si le nom d'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur en tant qu'admin
        const newUser = await User.create({ username, password: hashedPassword, isAdmin: true });

        // Rediriger vers la page de login admin
        res.redirect('/admin/login');
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




async function loginAdmin(req, res) {
    console.log('loginAdmin is called'); // Log de débogage
    try {
        const { username, password } = req.body;

        // Find the admin user
        const user = await User.findOne({ where: { username, isAdmin: true } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate token and set cookie for admin
        const token = jwt.sign({ id: user.id }, config.secretKey, {
            expiresIn: 86400, // expires in 24 hours
        });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' });



        // Redirect to admin profile
        res.redirect('/admin/adminProfile');
    } catch (error) {
        console.error('Error logging in admin:', error);
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

// Hash and store passwords for all users //Try catch pour pas crash le server
async function hashAndStorePasswords() {
    try {
        const users = await User.findAll();
        let alreadyHashedCount = 0;

        for (let user of users) {
            // Check if the password is already hashed
            if (user.password.length === 60) {
                alreadyHashedCount++;
                continue; // Skip to the next iteration
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        }

        console.log(`${alreadyHashedCount} passwords were already hashed.`);
        console.log('All necessary passwords have been hashed and stored.');
    } catch (error) {
        console.error('Error in hashAndStorePasswords:', error);
    }
}

// Call the function to hash and store passwords
try {
    hashAndStorePasswords();
} catch (error) {
    console.error('Error calling hashAndStorePasswords:', error);
}




module.exports = {
    registerAdmin,
    loginAdmin,
    registerUser,
    loginUser,
    updateUser,
};
