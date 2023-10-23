const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');
const Category = require('./Category');
const User = require('./User');

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
    },
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

productSchema.plugin(uniqueValidator);

productSchema.pre('save', function(next){
    if(this.isNew) {
        this.slug = slugify(this.title + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),{ lower: true, replacement: '-'});
        next();
    } else {
        next();
    }
});

productSchema.methods.increaseLikes = async function() {
    const INCREMENT_ONE = 1;
    this.favouritesCount += INCREMENT_ONE;

    await this.save()
}

productSchema.methods.decreaseLikes = async function() {
    const DECREASE_ONE = 1;
    this.favouritesCount -= DECREASE_ONE;

    await this.save()
}

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
        category: categoryObj?.name,
    }
}

productSchema.methods.toProductResponseLikes = async function(userEmail) {
    const categoryObj = await Category.findById(this.category).exec();// Obtenemos el object id de category para obtener el nombre
    let favorito = false;
    let followed = false;
    if(userEmail) {
        const user = await User.findOne({email: userEmail});

        favorito = await user.isFavourite(this.id);
        
        if(this.productOwner)
        followed = await user.isFollowing(this.productOwner);
    }

    // Obtenemos el usuario
    const user = await User.findById(this.productOwner).exec()
    
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        price: this.price,
        images: this.images,
        tagList: this.tagList,
        favouritesCount: this.favouritesCount,
        visitsCount: this.visitsCount,
        category: categoryObj?.name,
        isFavourited: favorito,
        productOwner: user?.username || "nothing",
        isFollowed: followed
    }
}

module.exports = mongoose.model('Product', productSchema);