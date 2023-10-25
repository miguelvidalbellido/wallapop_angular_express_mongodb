const asyncHandler = require('express-async-handler');

// Import models
const Comment = require('../models/Comment');
const Product = require('../models/Product');
//////////////////////////////////////////////////
/////////       LIST_CATEGORIES       ///////////
////////////////////////////////////////////////

const listComments = asyncHandler(async (req, res) => {
    // let query = {};
    const {slugProduct} = req.params;

    if(!slugProduct) {
        res.status(400).json({message: "slug product error"});
    }

    const getProductData = await Product.findOne({slug: slugProduct}).exec();
    
    if(!getProductData) {
        res.status(400).json({message: "Product error"});
    }

    
    const dataComments = await Comment.find({productId: getProductData.id}).exec();
    return res.status(200).json({
        comments: await Promise.all(dataComments.map(async comment => {
            return await comment.toCommentResponse();
        }))
    })
})


module.exports = {
    listComments
}