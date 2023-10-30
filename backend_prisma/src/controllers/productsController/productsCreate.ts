import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import productCreatePrisma from "../../utils/db/product/productCreatePrisma";
import productViewer from "../../view/productViewer";
import categoryGetPrisma from "../../utils/db/category/categoryGetPrisma";
import slugify from "slugify";

export default async function deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Comprobamos usuario
    const user = req.user;
    const { title, category: category_name, description, images, price } = req.body.product;

    try {
        
    if(!user) {
        return res.status(401).json({ message: "User error - [createProduct]" });
    }

    if(!title || !category_name || !description || !images || !price) {
        return res.status(401).json({ message: "Data error - [createProduct]" });
    }

    // Category
    const categoryData = await categoryGetPrisma(category_name); // Obtenemos la categoria [necesitamos el id]

    if(!categoryData) {
        return res.status(401).json({ message: "Category error - [createProduct]" });
    }

    const category = categoryData.id;

    // CreatedAt
    const createdAt = new Date(); // Obtenemos la fecha [createdAt]
    
    if(!createdAt) {
        return res.status(401).json({ message: "CreatedAt error - [createProduct]" });
    }
    
    // ProductOwner
    const productOwner = user.id;

    // Slug
    const slug = slugify(title + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),{ lower: true, replacement: '-'});
    
    if(!slug) {
        return res.status(401).json({ message: "Slug error - [createProduct]" });
    }

  
    // Insert in db
    const product = await productCreatePrisma(
        category,
        createdAt,
        description,
        images,
        price,
        productOwner,
        slug,
        title
    );

    console.log(product);
    // Create product view
    const productView = productViewer(product);
    return res.status(200).json({ product: productView });
    } catch (error) {
      return next(error);
    }
  }