const asyncHandler = require('express-async-handler');

// Import models
const Category = require('../models/Category');

//////////////////////////////////////////////////
/////////       LIST_CATEGORIES_SHORT     ///////
////////////////////////////////////////////////

const listCategoriesCarousel = asyncHandler(async (req, res) => {
    let query = {};

    const getCategories = await Category.find(query)
    const categoriesCount = await Category.count(query)

    // Obtener categorias
    const categoryResponses = await Promise.all(
        getCategories.map(async (category) => {
          return await category.toCategoryResponseShort();
        })
      );

    // Dividir el array en grupos de 4
    const CHUNKSIZE = 4;
    const chunkedCategories = [];
    for (let i = 0; i < categoryResponses.length; i += CHUNKSIZE) {
      const chunk = categoryResponses.slice(i, i + CHUNKSIZE);
      chunkedCategories.push(chunk);
    }

    return res.status(200).json({
        categories: chunkedCategories,
        categoriesCount: categoriesCount,
      });
})


module.exports = {
    listCategoriesCarousel
}