import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImage, IProductPage } from "../types/ProductType";


interface IProductState {
    pages: IProductPage,
    images: IImage[],
    isLoading: boolean,
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
        }
    }
})

export default productListSlice.reducer;
