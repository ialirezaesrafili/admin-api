const cloudinary = require('../config/cloudinary.config');

const uploadImageToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false,
        });

        req.file.cloudinaryUrl = uploadResult.secure_url; // Add the URL to the request object
        next(); // Pass control to the next middleware/controller
    } catch (error) {
        next(error); // Handle errors
    }
};

module.exports = uploadImageToCloudinary;
