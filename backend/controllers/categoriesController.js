const asyncHandler = require('express-async-handler');

// Import models
const Category = require('../models/Category');

//////////////////////////////////////////////////
/////////       LIST_CATEGORIES       ///////////
////////////////////////////////////////////////

const listCategories = asyncHandler(async (req, res) => {
    let query = {};

    const getCategories = await Category.find(query)
    const categoriesCount = await Category.count(query)

    return res.status(200).json({
        categories: await Promise.all(getCategories.map(async category => {
            return await category.toCategoryResponse();
        })),
        // categoriesCount: categoriesCount
    })
})


//////////////////////////////////////////////////
/////////       CREATE_CATEGORY       ///////////
////////////////////////////////////////////////

const createCategory = asyncHandler(async (req, res) => {
    
    const { name, description, image } = req.body;

    if(!name || !description || !image) {
        res.status(400).json({message: "All fields are required"})
    }

    const category = await Category.create({name, description, image});

    await category.save();
    
    return await res.status(200).json({
        ok: 'ok'
    })
})

module.exports = {
    listCategories,
    createCategory
}