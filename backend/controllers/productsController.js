const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

const listProducts = asyncHandler(async (req, res) => {
    let limit = 20;
    let offset = 0;
    let query = {};

    const filteredProducts = await Product.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'}).exec()

    const productCount = await Product.count(query);


        return res.status(200).json({
            products: await Promise.all(filteredProducts.map(async product => {
                // return await product.toArticleResponse(false);
                return product;
            })),
            productsCount: productCount
        });
});

const createProduct = asyncHandler(async (req, res) => {
    // const id = req.userId;

    // const author = await User.findById(id).exec();

    // const { title, description, price, category } = req.body.article;

    const { title, description, price, category } = req.body;


    // confirm data
    if (!title || !description || !price || !category) {
        res.status(400).json({message: "All fields are required"});
    }

    const product = await Product.create({ title, description, price, category });

    // if (Array.isArray(tagList) && tagList.length > 0) {
    //     product.tagList = '0';
    // }

    await product.save()

    return await res.status(200).json({
        // article: await article.toArticleResponse(author)
        ok: 'ok'
    })

});

module.exports = {
    listProducts,
    createProduct
}