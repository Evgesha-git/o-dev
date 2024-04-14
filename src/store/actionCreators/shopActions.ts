import axios from "axios";
import { AppDispatch } from "..";
import { shopReducerSlice } from "../reducers/shopReducer";
import { TFetching, TProduct } from "../../types/shopTypes";

export const getShopData = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(shopReducerSlice.actions.setLoading());
        const resp = await axios.get<TFetching>(`http://o-complex.com:1337/products?page=${page}&page_size=6`);
        const data = await resp.data;
        dispatch(shopReducerSlice.actions.setProducts(data.products));
        dispatch(shopReducerSlice.actions.setTotal(data.total));
        dispatch(shopReducerSlice.actions.setPage(page));
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(shopReducerSlice.actions.setError(e.message));
        }
    }
}

export const setData = (products: TProduct[], page: number) => (dispatch: AppDispatch) => {
    dispatch(shopReducerSlice.actions.setProducts(products));
    dispatch(shopReducerSlice.actions.setPage(page));
}