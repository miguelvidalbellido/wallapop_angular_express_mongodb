import { products } from "@prisma/client";

type product = products;

export default function productViewer(
    product: product
) {
    const productView = {
        slug: product.slug
    };
    return productView;
}