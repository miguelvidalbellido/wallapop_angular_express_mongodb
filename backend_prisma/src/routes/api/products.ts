import { Router } from "express";
import * as products from '../../controllers/productsController';
import * as auth from '../../middleware/auth/authorization';

const router = Router();

router.get(
    "/:slug",
    products.productsGet
);

router.post(
    "/create",
    auth.default,
    products.productsCreate
);

router.delete(
    "/delete/:slug",
    auth.default,
    products.productDelete
)

router.put(
    "/update/:slug",
    auth.default,
    products.productUpdate
)

export default router;