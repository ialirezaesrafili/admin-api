const {UserModel} = require("../models/user.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const privilege = async (req, res, next) => {
    try {
        const userToken = req?.cookies?.token;
        if (!userToken) {
            return res.status(401).json({message: "Access denied. No token provided."});
        }


        let decoded;
        try {
            decoded = jwt.verify(userToken, process.env.JWT_SECRET); // Use your JWT secret
        } catch (err) {
            return res.status(401).json({message: "Invalid or expired token."});
        }


        const user = await UserModel.findById(decoded.id).lean(); // Adjust if token payload has a different structure
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        // Check user role
        if (user.role === "admin") {
            return next(); // Allow access for admins
        }

        return res.status(403).json({message: "Access denied. Insufficient privileges."});
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports = {
    privilegeMiddleware: privilege
};
