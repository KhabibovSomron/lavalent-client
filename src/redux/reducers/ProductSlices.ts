import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImage, IProduct } from "../types/ProductType";


interface IProductState {
    products: IProduct[],
    images: IImage[],
    isLoading: boolean,
    error: string
}

const initialState: IProductState = {
    products: [],
    images: [],
    isLoading: false,
    error: ''
}

export const productListSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productListFetching(state) {
            state.isLoading = true
        },

        productListFetchingSuccess(state, action: PayloadAction<IProduct[]>) {
            state.isLoading = false
            state.products = action.payload
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
        }
    }
})

export default productListSlice.reducer;
