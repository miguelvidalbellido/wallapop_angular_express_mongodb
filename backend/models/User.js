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
    usersFollowing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
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