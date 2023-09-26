const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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

categorySchema.methods.toCategoryResponse = async function() {
    return {
        slug: this.slug,
        name: this.name,
        description: this.description
    }
}

module.exports = mongoose.model('Category', categorySchema);