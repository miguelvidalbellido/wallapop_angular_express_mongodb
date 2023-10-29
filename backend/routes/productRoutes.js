const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWToptional');


/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener la lista de productos con JWT Opcional.
 *     description: Obtiene una lista de productos. Se requiere autenticación opcional.
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *       401:
 *         description: No autorizado, token JWT inválido.
 *       500:
 *         description: Error del servidor.
 */
router.get('/', verifyJWTOptional, productController.listProducts);

/**
 * @openapi
 * /api/products/{slug}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener un producto por su slug con JWT opcional.
 *     description: Obtiene un producto basado en su slug. Se requiere autenticación opcional.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug del producto
 *         schema:
 *           type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Producto encontrado y devuelto con éxito.
 *       401:
 *         description: No autorizado, token JWT inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/:slug', verifyJWTOptional, productController.getProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crear un nuevo producto.
 *     description: Crea un nuevo producto con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput' # Puedes definir el esquema del producto en la sección components/schemas
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Solicitud incorrecta, verifique los datos proporcionados.
 *       500:
 *         description: Error del servidor al intentar crear el producto.
 */
router.post('/', productController.createProduct);


/**
 * @openapi
 * /api/products/categories/{slug}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener productos por categoría.
 *     description: Obtiene una lista de productos basados en una categoría específica.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *       404:
 *         description: No se encontraron productos para la categoría especificada.
 *       500:
 *         description: Error del servidor al intentar obtener los productos.
 */
router.get('/categories/:slug', productController.listProducts);

/**
 * @openapi
 * /api/products/favourite/{slug}:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Marcar o desmarcar un producto como favorito.
 *     description: Permite al usuario marcar o desmarcar un producto como favorito.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug del producto
 *         schema:
 *           type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Acción completada exitosamente.
 *       401:
 *         description: No autorizado, token JWT inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor al intentar marcar/desmarcar el producto.
 */
router.put('/favourite/:slug', verifyJWT, productController.likeOrDislikeProduct);

/**
 * @openapi
 * /api/products/user/favorites:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener productos marcados como favoritos por el usuario.
 *     description: Obtiene una lista de productos marcados como favoritos por el usuario autenticado.
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Lista de productos favoritos obtenida con éxito.
 *       401:
 *         description: No autorizado, token JWT inválido.
 *       500:
 *         description: Error del servidor al intentar obtener los productos marcados como favoritos.
 */
router.get('/user/favorites', verifyJWT, productController.productsLikeByUser);

/**
 * @openapi
 * /api/products/user/profileFavorites/{username}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener productos marcados como favoritos por un usuario específico.
 *     description: Obtiene una lista de productos marcados como favoritos por un usuario en particular.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Nombre de usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos favoritos del usuario obtenida con éxito.
 *       404:
 *         description: No se encontraron productos favoritos para el usuario especificado.
 *       500:
 *         description: Error del servidor al intentar obtener los productos favoritos del usuario.
 */
router.get('/user/profileFavorites/:username', productController.productsLikeUserProfile);


/**
 * @openapi
 * /api/products/user/publishedProducts/{username}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener productos publicados por un usuario específico.
 *     description: Obtiene una lista de productos publicados por un usuario en particular.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Nombre de usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos publicados por el usuario obtenida con éxito.
 *       404:
 *         description: No se encontraron productos publicados para el usuario especificado.
 *       500:
 *         description: Error del servidor al intentar obtener los productos publicados por el usuario.
 */
router.get('/user/publishedProducts/:username', productController.publishedProducts);


module.exports = router;