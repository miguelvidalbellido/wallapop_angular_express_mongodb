const express = require('express');
const router = express.Router();
// const verifyJWT = require('../middleware/verifyJWT');
// const verifyJWTOptional = require('../middleware/verifyJWTOptional');
const productController = require('../controllers/productsController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWToptional');

// feed endpoint must go before :slug endpoint
router.get('/',verifyJWTOptional, productController.listProducts);

router.get('/:slug', productController.getProduct);

router.post('/', productController.createProduct);

router.get('/categories/:slug', productController.listProducts);
router.put('/favourite/:slug',verifyJWT, productController.likeOrDislikeProduct)


module.exports = router;