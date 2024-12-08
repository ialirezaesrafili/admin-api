const autoBind = require("auto-bind");
const httpCode = require("http-status-codes");
const mongoose = require("mongoose");
const categoryService = require("../services/category.sevice");

class CategoryController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = categoryService;
    }

    async createCategory(req, res, next) {
        try {
            const {title} = req.body;
            if (!title) {
                return res.status(httpCode.BAD_REQUEST).json({
                    status: httpCode.BAD_REQUEST,
                    message: "Title is required!",
                });
            }

            const category = await this.#service.createCategory(title);

            return res.status(httpCode.CREATED).json({
                message: "Category created successfully",
                data: category,
            });
        } catch (error) {
            console.error("Error in createCategory:", error.message);
            next(new Error("Error during category creation"));
        }
    }

    async updateCategory(req, res, next) {
        try {
            const {id: catId} = req.params;
            const {title} = req.body;

            // Validate category ID
            if (!mongoose.Types.ObjectId.isValid(catId)) {
                return res.status(httpCode.BAD_REQUEST).json({
                    status: httpCode.BAD_REQUEST,
                    message: "Invalid category ID format",
                });
            }

            // Validate title
            if (!title || title.trim().length === 0) {
                return res.status(httpCode.BAD_REQUEST).json({
                    status: httpCode.BAD_REQUEST,
                    message: "Title is required!",
                });
            }

            const category = await this.#service.updateCategory({title, catId});

            return res.status(httpCode.OK).json({
                message: "Category updated successfully",
                data: category,
            });
        } catch (error) {
            console.error("Error in updateCategory:", error.message);
            next(new Error("Error during category update"));
        }
    }
}

module.exports = new CategoryController();
