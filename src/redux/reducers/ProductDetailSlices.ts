import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductDetail } from "../types/ProductType";

interface IShortBrand {
    id: number,
    title: string
}

interface IProductDetailState {
    productDetail: IProductDetail,
    brand: IShortBrand,
    isLoading: boolean,
    error: string
}

const initialState: IProductDetailState = {
    productDetail: {
        id: 0,
        vendor_code: 0,
        price: 0,
        brand: "",
        characteristic: '',
        description: '',
        material: '',
        sizes: []
    },
    brand: {
        id: 0,
        title: ''
    },
    isLoading: false,
    error: ''
}

export const productDetailSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productDetailFetching(state) {
            state.isLoading = true
            state.error = ''
        },

        productDetailFetchingSuccess(state, action: PayloadAction<IProductDetail>) {
            state.isLoading = false
            state.productDetail = action.payload
            state.error = ''
        },

        productDetailFetchingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        brandFetchingSuccess(state, action: PayloadAction<IShortBrand>) {
            state.brand = action.payload
            state.error = ''
            state.isLoading = false
        }
    }
})

export default productDetailSlice.reducer;
