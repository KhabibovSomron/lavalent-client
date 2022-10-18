import axios from "axios";
import { BrandSlice } from "../reducers/BrandSlices";
import { categoryListSlice } from "../reducers/CategorySlices";
import { AppDispatch } from "../Store";
import { BRANDLIST_URL, CATEGORYLIST_URL } from "./endpoints";


export const fetchCategories = () =>async (dispatch:AppDispatch) => {
    try {
        dispatch(categoryListSlice.actions.categoryListFetching())
        const response = await axios.get(CATEGORYLIST_URL)
        dispatch(categoryListSlice.actions.categoryListFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(categoryListSlice.actions.categoryListFetchingFailed(e.message))
    }    
}

export const fetchBrands = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(BrandSlice.actions.brandsFetching())
        const response = await axios.get(BRANDLIST_URL + `?category=${id}`)
        dispatch(BrandSlice.actions.brandsFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(BrandSlice.actions.brandsFetchingFailed(e.message))
    }
}