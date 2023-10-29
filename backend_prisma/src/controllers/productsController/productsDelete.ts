import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import productDeletePrisma from "../../utils/db/product/productDeletePrisma";
import productViewer from "../../view/productViewer";

export default async function deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const slug = req.params.slug;
  
    try {
  
      // Remove product from database
      const product = await productDeletePrisma(slug);
      if (!product) return res.sendStatus(500);
  
      // Create product view
      const productView = productViewer(product);
      return res.json({ product: productView });
    } catch (error) {
      return next(error);
    }
  }