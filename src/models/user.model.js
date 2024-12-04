const {Schema, model} = require('mongoose');
const {uploader} = require("../config/cloudinary.config");

// User Schema
const UserSchema = new Schema(
    {
        username: {type: String, unique: true}, // Optional field for user
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation regex
        },
        name: {type: String, required: false},
        lastname: {type: String, required: false},
        mobile: {type: String, required: false},
        avatar: {type: String, required: false, default: ""}, // Avatar image for the user
        password: {type: String, required: true},
        isActive: {type: Boolean, default: false},
        token: {type: String}, // Embedded Token for user authentication
        role: {
            type: String,
            enum: ["admin", "customer", "delivery"],
            default: "customer",
        },
        lastActive: {type: Date, required: false, default: null},
    },
    {timestamps: true} // Adds createdAt and updatedAt fields automatically
);
UserSchema.methods.uploadImageToCloudinary = async function (file) {
    try {
        const result = await uploader.upload(file.path, {
            folder: "users/",
            public_id: `${this._id}`,
            resource_type: 'auto',
        })
        // Assign the uploaded image URL to the product image field
        this.image = result.secure_url;
        this.images.push(result.secure_url);
        return this.save();

    } catch (err) {
        throw new Error('Error uploading image to Cloudinary');
    }
}


// Create the User model
const User = model("User", UserSchema);

module.exports = {
    UserModel: User,
};
