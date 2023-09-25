const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');

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
        type: String,
        required: true
    }
}, {
    timestamps: true
});

productSchema.plugin(uniqueValidator);

productSchema.pre('save', function(next){
    this.slug = slugify(this.title + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),{ lower: true, replacement: '-'});
    next();
});

module.exports = mongoose.model('Product', productSchema);