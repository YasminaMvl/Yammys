const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// au click sur le lien Admin, redirection vers lien superAdmin, connexion par PIN


function authorizeSuperAdmin(req, res, next) {

    //Middleware a refaire pour la V1

}

module.exports = authorizeSuperAdmin;
