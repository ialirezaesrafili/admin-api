const autoBind = require("auto-bind");
const {CategoryModel} = require("../models/category.model");
const slugify = require("slugify");
const {CategoryMessage} = require("../message/category.message");

class CategoryService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
    }

    async createCategory(title) {
        try {
            const existingCategory = await this.#model.findOne({title});
            if (existingCategory) {
                throw new Error(CategoryMessage.categoryIsExist);
            }

            const slug = slugify(title, {lower: true});
            const category = await this.#model.create({title, slug});

            return category;
        } catch (error) {
            console.error("Error in createCategory:", error.message);
            throw error;
        }
    }

    async updateCategory({title, catId}) {
        try {
            const category = await this.#model.findById(catId);
            if (!category) {
                throw new Error(CategoryMessage.categoryIsNotExist);
            }

            category.title = title;
            category.slug = slugify(title, {lower: true});
            await category.save();

            return category;
        } catch (error) {
            console.error("Error in updateCategory:", error.message);
            throw error;
        }
    }

    async deleteCategory(catId) {
        try {
            // Check if the category exists
            const category = await this.#model.findById(catId);
            if (!category) {
                throw new Error(CategoryMessage.categoryIsNotExist || "Category does not exist!");
            }

            // Delete the category
            const deletedCategory = await this.#model.findByIdAndDelete(catId);

            // Return the deleted category details
            return deletedCategory;

        } catch (error) {
            console.error("Error in deleteCategory:", error.message);
            throw error;
        }
    }

}

module.exports = new CategoryService();
