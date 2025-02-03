type imgType = string[] | undefined;

export interface productModel {
    category: string,
    name: string,
    price: number,
    quantity: number,
    sizes: string[],
    pictures: imgType,
}