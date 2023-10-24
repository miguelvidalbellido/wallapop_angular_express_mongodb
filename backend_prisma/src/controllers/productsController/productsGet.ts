import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import productGetPrisma from "../../utils/db/product/productGetPrisma";
import productViewer from "../../view/productViewer";

/**
 * Article controller that must receive a request.
 * The parameters of the request must have a slug.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function articlesGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;

  try {

    // Obtenemos el producto
    const product = await productGetPrisma(slug);
    if (!product) return res.sendStatus(404);

    // Creamos la vista del producto
    const productView = productViewer(product)

    return res.status(200).json({ product: productView });
  } catch (error) {
    return next(error);
  }
}