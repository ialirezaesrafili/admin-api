const { model, Schema, Types } = require('mongoose');
const uploadImageToCloudinaryMiddleware = require("../middleware/uploadsingle.middleware"); // Ensure path is correct

// Product Schema
const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: false },  // This will store the URL of the uploaded image
    category: { type: [Types.ObjectId], ref: 'Category', required: false, default: [] }, // Default value should be an empty array or valid category references
    discount: { type: Number, required: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Pre-save middleware for uploading image to Cloudinary
ProductSchema.pre('save', async function (next) {
    if (this.isModified('image')) { // Only upload image if the image field is modified
        try {
            await uploadImageToCloudinaryMiddleware(this);  // Passing 'this' directly for the middleware
            next(); // Proceed to the next middleware/save operation
        } catch (error) {
            next(error);  // Pass error to next middleware
        }
    } else {
        next(); // Proceed if no image update is detected
    }
});

// Create the Product model
const Product = model("Product", ProductSchema);

// Export the model
module.exports = {
    ProductModel: Product,
};
