export interface Producto {
    slug: String,
    title: string;
    description: string;
    price: number;
    images: string[];
    tagList: string[];
    favouritesCount: number;
    visitsCount: Number;
    category: String;
    isFavourited: boolean;
    productOwner?: String;
    isFollowed?: boolean;
}

export interface ProductoAndCount {
    products: Producto[];
    countProducts: number;
}