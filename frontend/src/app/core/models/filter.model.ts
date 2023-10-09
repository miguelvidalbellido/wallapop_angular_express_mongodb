// export interface filter{
//     limit: number;
//     offset: number;
//     title: String;
//     categories: String;
//     price_min: number;
//     price_max: number;
//     order: order
// }

export class filter{
    limit?: number;
    offset?: number;
    title?: String;
    categories?: String;
    price_min?: number;
    price_max?: number;
    order?: order
}

interface order{
    field: String;
    type: type_order
}

enum type_order{
    asc,
    desc
}