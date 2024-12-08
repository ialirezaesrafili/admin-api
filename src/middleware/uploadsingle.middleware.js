const cloudinary = require('../config/cloudinary.config');
const uploadImageToCloudinary = async (req, res, next) => {
    try {
        console.log('Uploaded file:', req.file); // Debug log
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false,
        });

        req.file.cloudinaryUrl = uploadResult.secure_url;
        next();
    } catch (error) {
        next(error);
    }
};


module.exports = uploadImageToCloudinary;
