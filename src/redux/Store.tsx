import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./reducers/CategorySlices";
import brandReducer from './reducers/BrandSlices'
import productReducer from './reducers/ProductSlices'
import productDetailReducer from './reducers/ProductDetailSlices'

const store = configureStore({
    reducer: {
        categoryList: categoryReducer,
        brandList: brandReducer,
        productList: productReducer, 
        productDetail: productDetailReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;