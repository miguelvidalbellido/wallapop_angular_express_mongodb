import { Router } from "express";
import * as products from '../../controllers/productsController';

const router = Router();

router.get(
    "/:slug",
    products.productsGet
);

export default router;