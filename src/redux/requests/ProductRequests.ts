import axios from "axios";
import { categoryListSlice } from "../reducers/CategorySlices";
import { AppDispatch } from "../Store";
import { CATEGORYLIST_URL } from "./endpoints";


export const fetchCategories = () =>async (dispatch:AppDispatch) => {
    try {
        dispatch(categoryListSlice.actions.categoryListFetching())
        const response = await axios.get(CATEGORYLIST_URL)
        dispatch(categoryListSlice.actions.categoryListFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(categoryListSlice.actions.categoryListFetchingFailed(e.message))
    }    
}