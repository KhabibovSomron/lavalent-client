export interface IProductPage {
    count: number,
    next: string,
    previous: string,
    results: IProduct[]
}

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

export interface ISizes {
    id: number,
    size: string
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

export interface IFavoriteList {
    products: number[]
}