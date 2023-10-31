import { Router } from "express";
import * as comments from '../../controllers/commentsController';
import * as auth from '../../middleware/auth/authorization';

const router = Router();

/**
 * @swagger
 * /api/comment:
 *   post:
 *     tags:
 *       - Comentarios
 *     summary: Crear un comentario
 *     description: Crea un comentario para un producto específico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *       401:
 *         description: Error al crear el comentario      
 */
router.post(
    "/",
    auth.default,
    comments.commentsCreate
);

/**
 * @swagger
 * /api/comment/{id}:
 *   delete:
 *     tags:
 *       - Comentarios
 *     summary: Eliminar un comentario
 *     description: Elimina un comentario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       401:
 *         description: No autorizado para eliminar el comentario
 *       404:
 *         description: Comentario no encontrado
 */
router.delete(
    "/:id",
    auth.default,
    comments.commentsDelete
);

export default router;