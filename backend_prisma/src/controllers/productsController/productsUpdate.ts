import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import productUpdatePrisma from "../../utils/db/product/productUpdatePrisma";
import productViewer from "../../view/productViewer";
import categoryGetPrisma from "../../utils/db/category/categoryGetPrisma";
import productGetPrisma from "../../utils/db/product/productGetPrisma";

export default async function updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
    
    // Comprobamos usuario
    const user = req.user;
    req.body.product.price = 10;
    const { title, category: category_name, description, images, price } = req.body.product;
    const slug = req.params.slug;

    try {
        
        //Comprobamos que el producto sea del propietario
        const _productInDb = await productGetPrisma(slug);

        if(!_productInDb) return res.status(404).json({message: "Product error - [updateProduct]"});

        if(_productInDb?.productOwner !== user?.id) {
            return res.status(403).json({message: "ProductOwner error - [updateProduct]"});
        }

        // Convert the category name to id
        const _categoryInDb = await categoryGetPrisma(category_name);

        if(!_categoryInDb) return res.status(404).json({message: "Category error - [updateProduct]"});

        // Update product
        const product = await productUpdatePrisma(slug, {
            title,
            price,
            category: _categoryInDb.id,
            description,
            images
        });
        
        const productView = productViewer(product);
        return res.status(200).json({ product: productView });
        return res.status(200).json({message: "updateProduct"});
    } catch(error) {
        return next(error);
    }

    }