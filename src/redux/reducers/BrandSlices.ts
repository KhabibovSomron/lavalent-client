import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand } from '../types/BrandType';


interface IBrandState {
    brands: IBrand[],
    isLoading: Boolean,
    error: string
}

const initialState: IBrandState = {
    brands: [],
    isLoading: false,
    error: ""
}

export const BrandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        brandsFetching(state) {
            state.isLoading = true
        },
        brandsFetchingSuccess(state, action: PayloadAction<IBrand[]>) {
            state.brands = action.payload.sort((a: IBrand, b: IBrand) => {
                let nameA = a.title.toLocaleLowerCase()
                let nameB = b.title.toLocaleLowerCase()
                if (nameA < nameB) {
                    return -1
                }

                if (nameA > nameB) {
                    return 1
                }

                return 0
            })
            state.isLoading = false
            state.error = ""
        },
        brandsFetchingFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export default BrandSlice.reducer;