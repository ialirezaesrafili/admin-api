const {Router} = require('express');

const uploadImageToCloudinaryMiddleware = require('../middleware/uploadsingle.middleware');
const UserController = require('../controllers/user.controller');
const upload = require("../config/multer.config");

const router = Router();

router.post(
    '/register',
    upload.single('avatar'), // Handle file upload
    uploadImageToCloudinaryMiddleware, // Upload to Cloudinary
    UserController.register // Register user
);
router.post('/login', UserController.login);


module.exports = {UserRouters: router};
