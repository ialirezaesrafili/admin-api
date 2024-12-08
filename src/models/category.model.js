const {Schema, model} = require('mongoose');


const categorySchema = new Schema({
    title: {type: String, required: true, unique: true},
    slug: {type: String, required: false, default: "slug-cat"},
})

const Category = model('Category', categorySchema);

module.exports = {
    CategoryModel: Category
}