const express = require('express');
const router = express.Router();
// const verifyJWT = require('../middleware/verifyJWT');
// const verifyJWTOptional = require('../middleware/verifyJWTOptional');
const productController = require('../controllers/productsController');

// feed endpoint must go before :slug endpoint
router.get('/', productController.listProducts);

// router.get('/:slug', articleController.getArticleWithSlug);

router.post('/', productController.createProduct);

// router.delete('/:slug', verifyJWT, articleController.deleteArticle);

// router.post('/:slug/favorite', verifyJWT, articleController.favoriteArticle);

// router.delete('/:slug/favorite', verifyJWT, articleController.unfavoriteArticle);

// router.put('/:slug', verifyJWT, articleController.updateArticle);



module.exports = router;