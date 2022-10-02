import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./reducers/CategorySlices";

const store = configureStore({
    reducer: {
        categoryList: categoryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;