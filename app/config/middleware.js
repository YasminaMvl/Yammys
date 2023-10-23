const expressSession = require('express-session');
const config = require('./config');

// Session middleware
const session = expressSession({
    secret: config.secretKey, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000 // 1 heure
    }
});

module.exports = {
    session,
};
