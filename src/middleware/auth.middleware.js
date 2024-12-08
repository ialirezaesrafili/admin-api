const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/user.model");

const authentication = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req?.cookies?.token;
        if (!token) {
            return res.status(401).json({error: "Access denied. No token provided."});
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (typeof decoded === "object" && "id" in decoded) {
            // Find the user and exclude sensitive fields
            const user = await UserModel.findById(decoded.id, {password: 0, token: 0}).lean();
            if (!user) {
                return res.status(404).json({error: "User not found."});
            }

            // Attach user information to the request
            req.user = user;
            return next();
        }

        // If decoded data is invalid
        return res.status(403).json({error: "Invalid token."});
    } catch (error) {


        // Catch-all for other errors
        next(error);
    }
};

module.exports = {
    auth: authentication,
};
