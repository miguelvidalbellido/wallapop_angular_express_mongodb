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

module.exports = {
    listCategories
}