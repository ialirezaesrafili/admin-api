const bcrypt = require('bcrypt');
require('dotenv').config();

// Middleware function for password hashing
const hashPasswordMiddleware = async (req, res, next) => {
    try {
        if (!req.body.password) return next(); // If no password is provided, skip
        const salt = await bcrypt.genSalt(process.env.SALT_KEY || 10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware
    }
};

module.exports = hashPasswordMiddleware;
