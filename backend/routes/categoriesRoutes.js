const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoriesController');

router.get('/', categoryController.listCategories);
router.get('/carousel', categoryController.listCategoriesShort);
router.post('/', categoryController.createCategory);

module.exports = router;