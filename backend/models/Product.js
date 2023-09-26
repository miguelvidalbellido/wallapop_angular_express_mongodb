const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');
const Category = require('./Category');

const productSchema = new mongoose.Schema({
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }],
    tagList: [{
        type: String
    }],
    favouritesCount: {
        type: Number,
        default: 0
    },
    visitsCount: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
});

productSchema.plugin(uniqueValidator);

productSchema.pre('save', function(next){
    this.slug = slugify(this.title + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),{ lower: true, replacement: '-'});
    next();
});


productSchema.methods.toProductResponse = async function() {
    const categoryObj = await Category.findById(this.category).exec();// Obtenemos el object id de category para obtener el nombre
    
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        price: this.price,
        images: this.images,
        tagList: this.tagList,
        favouritesCount: this.favouritesCount,
        visitsCount: this.visitsCount,
        category: categoryObj.name
    }
}

module.exports = mongoose.model('Product', productSchema);