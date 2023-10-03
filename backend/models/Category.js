const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify')

const categorySchema = new mongoose.Schema({
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        require: true
    }
}, {
    timestamps: true
});

categorySchema.plugin(uniqueValidator);

categorySchema.pre('save', function(next){
    this.slug = slugify(this.name + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),{ lower: true, replacement: '-'});
    next();
});

categorySchema.methods.toCategoryResponse = async function() {
    return {
        slug: this.slug,
        name: this.name,
        description: this.description,
        image: this.image
    }
}

categorySchema.methods.toCategoryResponseShort = async function() {
    return {
        slug: this.slug,
        images: this.image
    }
}

module.exports = mongoose.model('Category', categorySchema);