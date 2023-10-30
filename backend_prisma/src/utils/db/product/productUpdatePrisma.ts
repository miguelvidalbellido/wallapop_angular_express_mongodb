import slugify from "slugify";
import prisma from "../prisma";

interface UpdateFields {
    title?: string;
    price?: number;
    category?: string;
    description?: string;
    images?: string[];
}

export default async function productUpdatePrisma(
    slug: string, 
    updateFields: UpdateFields
) {
    const product = await prisma.products.update({
        where: {
            slug
        },
        data: {
            ...updateFields,
            updatedAt: new Date()
        }
    });

    return product;
}