import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import productDeletePrisma from "../../utils/db/product/productDeletePrisma";
import productViewer from "../../view/productViewer";
import productGetPrisma from "../../utils/db/product/productGetPrisma";

export default async function deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const slug = req.params.slug;
    const user = req.user;

    try {
      
      if(!user) return res.status(401).json({message: "User error - [deleteProduct]]"});

      const checkUserProduct = await productGetPrisma(slug);

      if(!checkUserProduct) return res.status(404).json({message: "Product error - [deleteProduct]"});

      if(checkUserProduct?.productOwner !== user.id) {
        return res.status(403).json({message: "ProductOwner error - [deleteProduct]"});
      }

      // Remove product from database
      const product = await productDeletePrisma(slug);
      if (!product) return res.status(500).json({message: "Product error - [deleteProduct]]"});
  
      // Create product view
      const productView = productViewer(product);
      return res.status(201).json({ product: productView });
    } catch (error) {
      return next(error);
    }
  }