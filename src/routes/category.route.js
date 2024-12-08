const {Router} = require('express');
const {privilegeMiddleware} = require("../middleware/privilege.middleware");
const {auth} = require("../middleware/auth.middleware");
const categoryController = require("../controllers/category.controller"); // Ensure this file exports createCategory

const router = Router();

router.post('/create-cat'
    , auth,
    categoryController.createCategory);

router.patch('/update-cat/:id'
    , auth,
    categoryController.updateCategory);

module.exports = {
    CategoryRouter: router,
};
