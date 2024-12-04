const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if token is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "Access denied. No token provided."});
    }

    const token = authHeader.split(" ")[1]; // Extract the token part

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: "Invalid or expired token."}); // Use 403 for invalid tokens
        }

        req.user = decoded;
        next();
    });
};

module.exports = authentication;
