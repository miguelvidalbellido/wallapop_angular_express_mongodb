import { products } from '@prisma/client';
import prisma from '../prisma';

export default async function createProductInMongoDB(
    category: string,
    createdAt: Date,
    description: string,
    images: string[],
    price: number,
    productOwner: string | null,
    slug: string,
    title: string
) {

    const product = await prisma.products.create({
        data: {
            v: 0,
            category: category,
            createdAt: createdAt,
            description: description,
            favouritesCount: 0,
            images: images,
            price: price,
            productOwner: productOwner,
            slug: slug,
            tagList: '',
            title: title,
            updatedAt: createdAt,
            visitsCount: 0
        }
    });

    return product;
}
