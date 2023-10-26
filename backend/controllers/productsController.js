const asyncHandler = require('express-async-handler');

// Import models
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
//////////////////////////////////////////////////
/////////       LIST_PRODUCTS       /////////////
////////////////////////////////////////////////

const listProducts = asyncHandler(async (req, res) => {
    const userEmailExists = req.userEmail; 
    
    let limit = 4;
    let offset = 0;
    let query = {};
    let sort = {};
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
        let TITLE = req.query.title
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
    
    // TEMA LIKES
    //const user = await User.findOne({email: userEmailExists});
    

    return res.status(200).json({
        products: await Promise.all(filteredProducts.map(async product => {
            return await product.toProductResponseLikes(userEmailExists);
        })),
        productsCount: productCount
    })

});

//////////////////////////////////////////////////
/////////       GET_PRODUCT         /////////////
////////////////////////////////////////////////

const getProduct = asyncHandler(async (req, res) => {
    const userEmailExists = req.userEmail; 
    const slug = req.params.slug;

    if(!slug) {
        res.status(400).json({message: "Slug is undefined"});
    }

    const product = await Product.findOne({ slug }).exec();

    if(!product) {
        return res.status(400).json({message: "Product not found"});
    }

    res.status(200).json({
        product: await product.toProductResponseLikes(userEmailExists)
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
    const dataCategory = await Category.findOne({ name: req.body.category }).exec();

    if (!dataCategory) {
        res.status(400).json({message: "Invalid category"});
    }

    // Añadim el productOwnerId estatic de moment usuari pruebas1

    const user = await User.findOne({username: "dev3"}).exec();

    const categoryObjectId = dataCategory.id;

    const product = await Product.create({ title, description, price, category: categoryObjectId, images, productOwner: user.id });

    await product.save()

    return await res.status(200).json({
        ok: 'ok'
    })

});

//////////////////////////////////////////////////
/////////       LIKE_PRODUCT       ///////////
////////////////////////////////////////////////
const likeOrDislikeProduct = asyncHandler(async (req, res) => {
    const slugProduct = req.params.slug;
    const userEmail = req.userEmail;

    const user = await User.findOne({ email: userEmail });
    const product = await Product.findOne({ slug: slugProduct });

    if(!product) {
        res.status(400).json({message: "slug error"});
    }

    if(!user) {
        res.status(400).json({message: "user error"});
    }

    const existsLike = await user.isFavourite(product.id);

    if(existsLike) {
        await user.unfavorite(product.id);
        await product.decreaseLikes();
    } else {
        await user.favorite(product.id);
        await product.increaseLikes();
    }

    

    return await res.status(200).json({
        change_favourite: true
    })

});


//////////////////////////////////////////////////
/////////       LIKE_PRODUCT       ///////////
////////////////////////////////////////////////
const productsLikeByUser = asyncHandler(async (req, res) => {
    const userEmail = req.userEmail;

    const user = await User.findOne({ email: userEmail });

    if(!user) {
        res.status(400).json({message: "user error"});
    }

    const productsLike = await Product.find({_id: {$in: user.productsLike}})
    
    const productCount = await Product.count({_id: {$in: user.productsLike}});

    return await res.status(200).json({
        products: await Promise.all(productsLike.map(async product => {
            return await product.toProductResponseLikes();
        })),
        productsCount: productCount
    })

});

//////////////////////////////////////////////////
/////////       LIKES_PROD_PROFILE    ///////////
////////////////////////////////////////////////
const productsLikeUserProfile = asyncHandler(async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({ username: username });

    if(!user) {
        res.status(400).json({message: "user error"});
    }

    const productsLike = await Product.find({_id: {$in: user.productsLike}})
    
    const productCount = await Product.count({_id: {$in: user.productsLike}});

    return await res.status(200).json({
        products: await Promise.all(productsLike.map(async product => {
            return await product.toProductResponseLikes();
        })),
        productsCount: productCount
    })

});


//////////////////////////////////////////////////
/////////   PUBLISHED_PROD_PROFILE    ///////////
////////////////////////////////////////////////
const publishedProducts = asyncHandler(async (req, res) => {
    const {username} = req.params;

    const user = await User.findOne({ username: username });

    if(!user) {
        res.status(400).json({message: "user error"});
    }


    const productsPublished = await Product.find({productOwner: user.id})
    
    const productCount = await Product.count({productOwner: user.id});

    return await res.status(200).json({
        products: await Promise.all(productsPublished.map(async product => {
            return await product.toProductResponseLikes();
        })),
        productsCount: productCount
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
    getProduct,
    likeOrDislikeProduct,
    productsLikeByUser,
    productsLikeUserProfile,
    publishedProducts
}