const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
    return {
        id: this.id,
        commentOwner: this.commentOwner,
        productId: this.productId,
        body: this.body 
    }
}


module.exports = mongoose.model('Comment', commentSchema);