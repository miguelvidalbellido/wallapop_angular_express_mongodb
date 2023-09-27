const asyncHandler = require('express-async-handler');

// Import models
const Product = require('../models/Product');
const Category = require('../models/Category');

//////////////////////////////////////////////////
/////////       LIST_PRODUCTS       /////////////
////////////////////////////////////////////////

const listProducts = asyncHandler(async (req, res) => {
    let limit = 20;
    let offset = 0;
    let query = {};

    // Si tenemos slug construimos una query para indicar porque ha de filtrar
    if(req.params.slug) {
        const dataCategory = await Category.findOne({ slug: req.params.slug }).exec();

        if(!dataCategory) {
            res.status(400).json({message: "Category not found"})
        }

        query = { category: dataCategory.id }
    }

    const filteredProducts = await Product.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'}).exec()

    const productCount = await Product.count(query);


    return res.status(200).json({
        products: await Promise.all(filteredProducts.map(async product => {
            return await product.toProductResponse();
        })),
        productsCount: productCount
    })

});

//////////////////////////////////////////////////
/////////       GET_PRODUCT         /////////////
////////////////////////////////////////////////

const getProduct = asyncHandler(async (req, res) => {

    const slug = req.params.slug;

    if(!slug) {
        res.status(400).json({message: "Slug is undefined"});
    }

    const product = await Product.findOne({ slug }).exec();

    if(!product) {
        return res.status(400).json({message: "Product not found"});
    }

    res.status(200).json({
        product: await product.toProductResponse()
    });

});

//////////////////////////////////////////////////
/////////       CREATE_PRODUCTS       ///////////
////////////////////////////////////////////////
const createProduct = asyncHandler(async (req, res) => {

    const { title, description, price, category, images } = req.body;


    // confirm data
    if (!title || !description || !price || !category) {
        res.status(400).json({message: "All fields are required"});
    }
    console.log(images);
    const dataCategory = await Category.findOne({ name: req.body.category }).exec();

    if (!dataCategory) {
        res.status(400).json({message: "Invalid category"});
    }

    const categoryObjectId = dataCategory.id;

    const product = await Product.create({ title, description, price, category: categoryObjectId, images });
    console.log(categoryObjectId);

    await product.save()

    return await res.status(200).json({
        ok: 'ok'
    })

});

module.exports = {
    listProducts,
    createProduct,
    getProduct
}