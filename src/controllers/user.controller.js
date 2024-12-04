const autoBind = require("auto-bind");
const httpCode = require("http-status-codes");
const userService = require("../services/user.service");
const {Token} = require("../constant/cookie.enum");

class UserController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = userService;
    }

    // Register method
    async register(req, res, next) {
        try {
            const { email, password, username, role } = req.body;
            const file = req.file ? req.file.path : null; // Safely handle missing file

            // Basic validation
            if (!email || !password || !username) {
                return res.status(httpCode.BAD_REQUEST).json({
                    status: "error",
                    message: "Email, password, and username are required",
                });
            }

            // Call service to register the user
            const user = await this.#service.register({ email, password, role, username, file });

            // Return success response
            return res.status(httpCode.CREATED).json({
                status: "success",
                message: "User registered successfully",
                data: { user },
            });

        } catch (error) {
            // Pass error to middleware
            console.error("Error during registration:", error); // Log the error
            return next(error); // Pass the error to the error-handling middleware
        }
    }

    // Login method
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Basic validation
            if (!email || !password) {
                return res.status(httpCode.BAD_REQUEST).json({
                    status: "error",
                    message: "Email and password are required",
                });
            }

            // Call service to authenticate the user
            const { user, token } = await this.#service.login({ email, password });

            // Return success response with token
            return res.cookie(Token, token, {
                httpOnly: true,
            }).status(httpCode.OK).json({
                status: "success",
                message: "User logged in successfully",
                data: { user, token }, // Include token in response
            });

        } catch (error) {
            console.error("Error during login:", error); // Log the error
            return next(error); // Pass the error to the error-handling middleware
        }
    }
}

module.exports = new UserController();
