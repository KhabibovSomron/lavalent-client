import { breadCrumbsSlice } from "../reducers/BreadCrumbsSlices";
import { AppDispatch } from "../Store";
import { IBreadCrumbs } from "../types/BreadCrumbsType";



export const addLink = (new_title: string, new_url: string) => (dispatch:AppDispatch) => {
    dispatch(breadCrumbsSlice.actions.addLink(
        {
            title: new_title,
            url: new_url
        }
    ))
}

export const removeLink = (title: string) => (dispatch:AppDispatch) => {
    dispatch(breadCrumbsSlice.actions.deleteLink(title))
}

export const setLinks = (links: IBreadCrumbs[]) => (dispatch: AppDispatch) => {
    dispatch(breadCrumbsSlice.actions.setLinks(links))
}