import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./reducers/CategorySlices";
import breadCrumbsReducer from './reducers/BreadCrumbsSlices';
import brandReducer from './reducers/BrandSlices'

const store = configureStore({
    reducer: {
        categoryList: categoryReducer,
        breadCrumbs: breadCrumbsReducer,
        brandList: brandReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;