import { Router } from "express";
import * as products from '../../controllers/productsController';
import * as auth from '../../middleware/auth/authorization';

const router = Router();

/**
 * @swagger
 * /api/products/{slug}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener información de un producto
 *     description: Obtiene información de un producto por su slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del producto obtenida con éxito
 *       404:
 *         description: Producto no encontrado
 */

router.get("/:slug", products.productsGet);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crear un producto
 *     description: Crea un nuevo producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       401:
 *         description: No autorizado para crear el producto
 */

router.post("/create", auth.default, products.productsCreate);

/**
 * @swagger
 * /api/products/delete/{slug}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Eliminar un producto
 *     description: Elimina un producto por su slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       401:
 *         description: No autorizado para eliminar el producto
 *       404:
 *         description: Producto no encontrado
 */

router.delete("/delete/:slug", auth.default, products.productDelete);

/**
 * @swagger
 * /api/products/update/{slug}:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Actualizar un producto
 *     description: Actualiza un producto por su slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       401:
 *         description: No autorizado para actualizar el producto
 *       404:
 *         description: Producto no encontrado
 */

router.put("/update/:slug", auth.default, products.productUpdate);

export default router;
