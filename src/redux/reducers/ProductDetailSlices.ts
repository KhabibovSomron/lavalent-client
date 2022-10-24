import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductDetail, ISizes } from "../types/ProductType";


interface IProductDetailState {
    productDetail: IProductDetail,
    sizes: ISizes[],
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
        material: ''
    },
    sizes: [],
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

        productSizesFetchingSuccess(state, action: PayloadAction<ISizes[]>) {
            state.isLoading = false
            state.error = ''
            state.sizes = action.payload
        }
    }
})

export default productDetailSlice.reducer;
