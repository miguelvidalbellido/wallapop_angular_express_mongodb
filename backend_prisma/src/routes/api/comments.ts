import { Router } from "express";
import * as comments from '../../controllers/commentsController';
import * as auth from '../../middleware/auth/authorization';

const router = Router();

router.post(
    "/",
    auth.default,
    comments.commentsCreate
);

router.delete(
    "/:id",
    auth.default,
    comments.commentsDelete
);

export default router;