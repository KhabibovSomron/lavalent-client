import axios from "axios";
import { BrandSlice } from "../reducers/BrandSlices";
import { categoryListSlice } from "../reducers/CategorySlices";
import { productDetailSlice } from "../reducers/ProductDetailSlices";
import { productListSlice } from "../reducers/ProductSlices";
import { AppDispatch } from "../Store";
import { BRANDLIST_URL, CATEGORYLIST_URL, FAVORITE_PRODUCTS_URL, IMAGESLIST_URL, PRODUCTDETAIL_URL, PRODUCTLIST_URL, PRODUCTSIZES_URL } from "./endpoints";


export const fetchCategories = () =>async (dispatch:AppDispatch) => {
    try {
        dispatch(categoryListSlice.actions.categoryListFetching())
        const response = await axios.get(CATEGORYLIST_URL)
        dispatch(categoryListSlice.actions.categoryListFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(categoryListSlice.actions.categoryListFetchingFailed(e.message))
    }    
}

export const fetchBrands = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(BrandSlice.actions.brandsFetching())
        const response = await axios.get(BRANDLIST_URL + `?category=${id}`)
        dispatch(BrandSlice.actions.brandsFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(BrandSlice.actions.brandsFetchingFailed(e.message))
    }
}

export const fetchProducts = (category_id:number, brand_id: number | null, page: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productListSlice.actions.productListFetching())
        let url = PRODUCTLIST_URL + `?category=${category_id}`
        if (brand_id !== null) {
            url += `&brand=${brand_id}`
        }

        if (page !== 1) {
            url += `&page=${page}`
        }
        const response = await axios.get(url)
        dispatch(productListSlice.actions.productListFetchingSuccess(response.data))

    } catch (e: any) {
        dispatch(productListSlice.actions.productListFetchingFailed(e.message))
    }
}

export const fetchProductImages = (product_id: number) =>async (dispatch: AppDispatch) => {
    try {
        dispatch(productListSlice.actions.productListFetching())
        const res = await axios.get(IMAGESLIST_URL + `?product=${product_id}`)
        dispatch(productListSlice.actions.imagesFetchingSuccess(res.data))
    } catch (e: any) {
        dispatch(productListSlice.actions.productListFetchingFailed(e.message))
    }    
}

export const fetchProductDetail = (product_id: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productDetailSlice.actions.productDetailFetching())
        const res = await axios.get(PRODUCTDETAIL_URL + `${product_id}/`)
        console.log(res.data)
        dispatch(productDetailSlice.actions.productDetailFetchingSuccess(res.data))
    } catch (e: any) {
        dispatch(productDetailSlice.actions.productDetailFetchingFailed(e.message))   
    }
}

export const fetchProductSizes = (product_id: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productDetailSlice.actions.productDetailFetching())
        const res = await axios.get(PRODUCTSIZES_URL + `?product=${product_id}`)
        dispatch(productDetailSlice.actions.productSizesFetchingSuccess(res.data))
    } catch (e: any) {
        dispatch(productDetailSlice.actions.productDetailFetchingFailed(e.message))
    }
}

export const fetchFavoriteProducts = (products_id: number[], page: number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productListSlice.actions.productListFetching())
        let url = FAVORITE_PRODUCTS_URL + '?'
        products_id.forEach((id, index) => {
            url += `ids=${id}`
            if (index !== products_id.length - 1) {
                url += '&'
            }
        })

        if (page !== 1) {
            url += `&page=${page}`
        }

        const res = await axios.get(url)
        dispatch(productListSlice.actions.productListFetchingSuccess(res.data))
    } catch (e: any) {
        dispatch(productListSlice.actions.productListFetchingFailed(e.message))
    }
    

}