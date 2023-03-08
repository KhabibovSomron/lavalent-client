import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImage, IProduct, IProductPage } from "../types/ProductType";


interface IProductState {
    pages: IProductPage,
    images: IImage[],
    random_products: IProduct[],
    isLoading: boolean,
    isRandomProductLoading: boolean,
    error: string
}

const initialState: IProductState = {
    pages: {
        count: 0,
        next: "",
        previous: "",
        results: []
    },
    images: [],
    random_products: [],
    isLoading: false,
    isRandomProductLoading: false,
    error: ''
}

export const productListSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productListFetching(state) {
            state.isLoading = true
        },

        productListFetchingSuccess(state, action: PayloadAction<IProductPage>) {
            state.isLoading = false
            state.pages = action.payload
            state.error = ''
        },

        productListFetchingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        imagesFetchingSuccess(state, action: PayloadAction<IImage[]>) {
            state.error = ''
            state.images = action.payload
            state.isLoading = false
        },

        randomProductFetching(state) {
            state.isRandomProductLoading = true
        },

        randomProductsFetchingSuccess(state, action: PayloadAction<IProduct[]>) {
            state.error = ''
            state.random_products = action.payload
            state.isRandomProductLoading = false
        },

        randomProductFetchingFailed(state, action: PayloadAction<string>) {
            state.isRandomProductLoading = false
            state.error = action.payload
        }
    }
})

export default productListSlice.reducer;
