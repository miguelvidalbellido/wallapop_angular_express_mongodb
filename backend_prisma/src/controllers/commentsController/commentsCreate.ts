import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentCreatePrisma from "../../utils/db/comment/commentCreatePrisma";
import commentViewer from "../../view/commentViewer";
import productGetPrisma from "../../utils/db/product/productGetPrisma";

export default async function createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(req.body);
    
    const { body: body, slug: slugProduct } = req.body.comment;
    const user = req.user;

    try {

      if(!body || !slugProduct) {
        return res.status(401).json({ message: "Data of comment error - [comment]" });
      }

      if(!user) {
        return res.status(401).json({ message: "User error - [comment]" });
      }

      const userId = user.id;

      if(!userId) {
        return res.status(401).json({ message: "UserId error - [comment]" });
      }

      // Obtains id of product
      const productData = await productGetPrisma(slugProduct);
      
      if(!productData) {
        return res.status(401).json({ message: "Product not found - [comment]" });
      }

      const productId = productData.id;

      if(!productId) {
        return res.status(401).json({ message: "Product ID error - [comment]" });
      }
      
      // Add comment to database
      const comment = await commentCreatePrisma(
        body,
        userId,
        productId
      );
  
      // Create comment view
      const commentView = commentViewer(comment);
      return res.status(201).json({ comment: commentView });

    } catch (error) {
      return next(error);
    }
  }