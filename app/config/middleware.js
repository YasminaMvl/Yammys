const expressSession = require('express-session');
const config = require('./config');

// Session middleware
const session = expressSession({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
});

module.exports = {
    session,
};
