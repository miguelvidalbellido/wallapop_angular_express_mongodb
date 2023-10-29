const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoriesController');

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *      - Categorías
 *     summary: Get all categories.
 *     description: Get a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 */
router.get('/', categoryController.listCategories);

/**
 * @openapi
 * /api/categories/carousel:
 *   get:
 *     tags:
 *      - Categorías
 *     summary: Get categories for carousel.
 *     description: Get a list of categories used in the carousel.
 *     responses:
 *       200:
 *         description: A list of categories for the carousel.
 */
router.get('/carousel', categoryController.listCategoriesShort);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags:
 *      - Categorías
 *     summary: Create a category.
 *     description: Create a new category.
 *     responses:
 *       200:
 *         description: Category created successfully.
 *       400:
 *         description: Bad request, category creation failed.
 */
router.post('/', categoryController.createCategory);

module.exports = router;