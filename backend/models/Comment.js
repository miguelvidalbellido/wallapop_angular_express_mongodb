const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = require("../models/User");
const commentSchema = new mongoose.Schema({
    commentOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    body:{
        type: String,
        require: true
    }
}, {
    timestamps: true
});

commentSchema.plugin(uniqueValidator);

commentSchema.methods.toCommentResponse = async function() {
    const _user = await User.findById(this.commentOwner);
    return {
        id: this.id,
        commentOwner: _user.username,
        productId: this.productId,
        body: this.body 
    }
}


module.exports = mongoose.model('Comment', commentSchema);