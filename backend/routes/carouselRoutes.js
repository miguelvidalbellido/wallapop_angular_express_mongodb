const express = require('express');
const router = express.Router();

const carouselController = require('../controllers/carouselController');


/**
 * @openapi
 * /api/carousel/categories:
 *   get:
 *     tags:
 *      - Carrusel
 *     summary: Obtiene las categorías para el carrusel.
 *     description: Obtiene una lista de categorías utilizadas en el carrusel.
 *     responses:
 *       200:
 *         description: Listado de categorías del carrusel obtenida con éxito.
 *       404:
 *         description: No se encontraron categorías para el carrusel.
 */
router.get('/categories', carouselController.listCategoriesCarousel);

module.exports = router;