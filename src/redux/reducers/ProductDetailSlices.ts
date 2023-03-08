import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOnlyIdProductList, IProductDetail } from "../types/ProductType";

interface IProductDetailState {
    productDetail: IProductDetail,
    isLoading: boolean,
    error: string,
    onlyIdProductList: IOnlyIdProductList[]
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
        sizes: [],
    },
    isLoading: false,
    error: '',
    onlyIdProductList: []
}

export const productDetailSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        onlyIdProductListFetchingSuccess(state, action: PayloadAction<IOnlyIdProductList[]>) {
            state.error = ''
            state.isLoading = false
            state.onlyIdProductList = action.payload
        },

        onlyIdListFetchingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

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
    }
})

export default productDetailSlice.reducer;
