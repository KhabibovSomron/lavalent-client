import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBreadCrumbs } from '../types/BreadCrumbsType'


interface IBreadCrumbsState {
    links: IBreadCrumbs[],
}

const initialState: IBreadCrumbsState = {
    links: []
}

export const breadCrumbsSlice = createSlice({
    name: "breadCrumbs",
    initialState,
    reducers: {
        setLinks(state, action: PayloadAction<IBreadCrumbs[]>) {
            state.links = action.payload;
        },
        addLink(state, action: PayloadAction<IBreadCrumbs>) {
            state.links.push(action.payload)
        },
        deleteLink(state, action: PayloadAction<string>) {
            state.links = state.links.filter(item => item.title !== action.payload)
        }
    }
})

export default breadCrumbsSlice.reducer;