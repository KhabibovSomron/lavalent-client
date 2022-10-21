export interface IProduct {
    id: number,
    price: number,
    vendor_code: number,
    material: string,
    poster: string
}

export interface IImage {
    id: number,
    image: string
}

export interface IProductDetail {
    id: number,
    vendor_code: number,
    price: number,
    material: string,
    brand: string,
    description: string,
    characteristic: string
}