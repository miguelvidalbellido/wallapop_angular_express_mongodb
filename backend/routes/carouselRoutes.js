const express = require('express');
const router = express.Router();

const carouselController = require('../controllers/carouselController');

router.get('/categories', carouselController.listCategoriesCarousel);

module.exports = router;