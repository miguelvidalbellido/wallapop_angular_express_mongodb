const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const commentsController = require('../controllers/commentsController');


/**
 * @openapi
 * /api/products/{slugProduct}:
 *   get:
 *     tags:
 *      - Comentarios
 *     summary: Obtiene comentarios de un producto por su slug.
 *     description: Obtiene una lista de comentarios de un producto según su slug.
 *     parameters:
 *       - in: path
 *         name: slugProduct
 *         description: Slug del producto del cual se desean obtener los comentarios.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida con éxito.
 *       400:
 *         description: El producto no tiene comentarios o no se encuentra.
 */
router.get('/:slugProduct', commentsController.listComments);

module.exports = router;