import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from "../types/CategoryType";


interface ICategoryState {
    categories: ICategory[],
    isLoading: boolean,
    error: string
}

const initialState: ICategoryState = {
    categories: [],
    isLoading: false,
    error: ""
}

export const categoryListSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoryListFetching(state) {
            state.isLoading = true
        },

        categoryListFetchingSuccess(state, action: PayloadAction<ICategory[]>) {
            state.isLoading = false
            state.categories = action.payload
            state.error = ""
        },

        categoryListFetchingFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export default categoryListSlice.reducer;