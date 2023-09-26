const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoriesController');

router.get('/', categoryController.listCategories);

module.exports = router;