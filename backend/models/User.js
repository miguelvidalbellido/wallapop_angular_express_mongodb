const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    userBio: {
        type: String,
        required: false
    },
    f_nac: {
        type: Date,
        required: false
    },
    cp: {
        type: Number,
        required: false
    },
    profileImage: {
        type: String,
        required: false
    },
    usersFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    productsLike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator);

userSchema.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.passwordHash
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );
    return accessToken;
}

userSchema.methods.isFavourite = function (id) {
    const idStr = id.toString();
    for (const product of this.productsLike) {
        if (product.toString() === idStr) {
            return true;
        }
    }
    return false;
}

userSchema.methods.favorite = function (id) {
    if(this.productsLike.indexOf(id) === -1){
        this.productsLike.push(id);
    }

    return this.save();
}

userSchema.methods.unfavorite = function (id) {
    if(this.productsLike.indexOf(id) !== -1){
        this.productsLike.remove(id);
    }

    return this.save();
};

userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    return this.usersFollowing.includes(idStr);
}

userSchema.methods.follow = function (id) {
    if(this.usersFollowing.indexOf(id) === -1){
        this.usersFollowing.push(id);
    }

    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if(this.usersFollowing.indexOf(id) !== -1){
        this.usersFollowing.remove(id);
    }

    return this.save();
};

userSchema.methods.toUserResponse = async function() {
    return {
        username: this.username,
        email: this.email,
        //passwordHash: this.passwordHash,
        userBio: this.userBio,
        f_nac: this.f_nac,
        cp: this.cp,
        profileImage: this.profileImage
    }
}

userSchema.methods.toUserResponseProfileData = async function(count_products, count_followers, countLikes) {

    

    return {
        username: this.username,
        email: this.email,
        userBio: this.userBio,
        f_nac: this.f_nac,
        cp: this.cp,
        profileImage: this.profileImage,
        countPublishedProducts: count_products,
        count_followers: count_followers,
        count_likes: countLikes
    }
}

userSchema.methods.toUserResponseProfileStats = async function(count_products, count_followers, countLikes) {

    

    return {
        countPublishedProducts: count_products,
        count_followers: count_followers,
        count_likes: countLikes
    }
}

userSchema.methods.toUserResponseWithToken = async function() {
    return {
        username: this.username,
        email: this.email,
        //passwordHash: this.passwordHash,
        userBio: this.userBio,
        f_nac: this.f_nac,
        cp: this.cp,
        profileImage: this.profileImage,
        token: this.generateAccessToken()
    }
}



module.exports = mongoose.model('User', userSchema);