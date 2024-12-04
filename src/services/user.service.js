const autoBind = require("auto-bind");
const {UserModel} = require("../models/user.model");
const {sign} = require("jsonwebtoken");
const {hashPassword, checkPassword} = require("../utils/hashPassword.utils");
const {uploader} = require("../config/cloudinary.config");
const {UserMessage} = require("../message/user.message");

require('dotenv').config();

class UserService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }

    // Register method for creating a new user
    async register({email, password, role = "customer", username, file}) {
        try {
            // Check if email or username already exists
            const [checkEmail, checkUsername] = await Promise.all([
                this.#model.findOne({email}),
                this.#model.findOne({username}),
            ]);

            if (checkEmail) {
                throw new Error(UserMessage.EmailFound || "Email is already in use.");
            }

            if (checkUsername) {
                throw new Error(UserMessage.UsernameFound || "Username is already in use.");
            }

            // Hash the password
            const hashedPassword = await hashPassword(password);

            // Upload avatar to Cloudinary
            const uploadResult = await uploader.upload(file, {
                folder: "avatar/",
                public_id: username.toLowerCase().replace(/\s+/g, "-"),
            });

            // Create user if validation passes
            const user = await this.#model.create({
                email,
                password: hashedPassword,
                role,
                username,
                avatar: uploadResult.secure_url,
            });

            return user;
        } catch (error) {
            console.error("Error registering user:", error.stack || error);
            throw new Error(error.message || "An error occurred during registration.");
        }
    }

    // Login method for authenticating a user
    async login({email, password}) {
        try {
            // Find the user by email
            const user = await this.#model.findOne({email});
            if (!user) {
                throw new Error(UserMessage.EmailNotFound || "Email does not exist!");
            }

            // Check if the password matches
            const passwordChecked = await checkPassword(password, user.password);
            if (!passwordChecked) {
                throw new Error(UserMessage.CredentialsError || "Invalid email or password!");
            }

            // Update user activity status
            user.isActive = true;

            // Generate JWT token
            const token = this.signToken({email: user.email, id: user._id});
            user.token = token;

            user.lastActive = new Date().toISOString();


            // Save user state
            await user.save();

            return {user, token};
        } catch (error) {
            console.error("Error logging in user:", error.stack || error);
            throw new Error(error.message || "An error occurred during login.");
        }
    }

    // JWT Token Generation
    signToken(payload) {
        return sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '2h'});
    }
}

module.exports = new UserService();
