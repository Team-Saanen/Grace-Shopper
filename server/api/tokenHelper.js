const jwt = require('jsonwebtoken');
const { models: { User } } = require('../db');
require('dotenv').config();


// Add to functions that require user tokens.
const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.byToken(token);
        req.user = user;
        next();
    } catch (ex) {
        next(ex);
    }
};

module.exports = requireToken;