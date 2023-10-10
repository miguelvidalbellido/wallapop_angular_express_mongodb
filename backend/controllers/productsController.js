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
    let sort = {};
    // console.log(req.query);
    // Procesador HTTP params del cliente
    
    if (req.query.offset) {
        offset = req.query.offset;
    }

    if (req.query.limit) {
        limit = req.query.limit;
    }

    // FILTRAR CATEGORIA/S
    if( (req.params.slug !== undefined || req.query.categories !== undefined) &&
        (req.params.slug !== null || req.query.categories !== null) &&
        (req.query.categories !== 'null')) {

        let DATA_SLUG = req.params.slug ? [req.params.slug] : req.query.categories
        let objectsIdCategory = []
        let dataCategory = ''
        
        if(typeof DATA_SLUG === 'string') {
            dataCategory = await Category.findOne({ slug: DATA_SLUG }).exec();

            objectsIdCategory.push(dataCategory.id)
        } else {
            objectsIdCategory = await Promise.all(DATA_SLUG.map(async (element) => {
                const category = await Category.findOne({ slug: element }).exec();
                return category.id;
            }));
        }

        if(!objectsIdCategory) {
            res.status(400).json({message: "Category not found"})
        }

        query.category = { $in : objectsIdCategory}
    }

    // FILTRAR PRECIO 
    if(req.query.price_min || req.query.price_max) {
        let PRICE_MIN = req.query.price_min ; // Simula igual o mayor que
        let PRICE_MAX = req.query.price_max ? req.query.price_max : await obtainMaxPrice();

        if(PRICE_MIN > PRICE_MAX) {
            res.status(400).json({message: "Price min upper than max"})
        }

        query.price = { $gte: PRICE_MIN, $lte: PRICE_MAX } ;
    }

    // FILTRAR TITULO
    if(req.query.title){
        console.log('holaaa');
        let TITLE = req.query.title
        console.log(TITLE);
        query.title = { $regex: TITLE }
    }

    // ORDENAR
    if(req.query.order){
        const DATA_SORT = req.query.order;

        switch (DATA_SORT) {
            case 'price_asc':
                sort['price'] = 1;
                break;
            case 'price_desc':
                sort['price'] = -1;
                break;
            case 'views_asc':
                sort['visitsCount'] = 1;
                break;
            case 'views_desc':
                sort['visitsCount'] = -1;
                break;
            case 'fpub_asc':
                sort['createdAt'] = 1;
                break;
            case 'fpub_desc':
                sort['createdAt'] = -1;
                break;
            default:
                sort['createdAt'] = -1;
        }

    } else {
        sort['createdAt'] = -1;
    }

    const filteredProducts = await Product.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort).exec()

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

// Internal function

const obtainMaxPrice = asyncHandler(async () => {
    const INCREMENT_ONE = 1;
    let product = await Product.findOne().sort({price: -1}).limit(1);
    return product.price;
})
module.exports = {
    listProducts,
    createProduct,
    getProduct
}