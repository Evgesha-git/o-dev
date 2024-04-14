import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../../types/shopTypes';

type TInitState = {
    products: TProduct[] | null,
    page: number,
    productPerPage: number,
    total: number,
    loading: boolean,
    error: string | null,
}

const initState: TInitState = {
    products: null,
    page: 1,
    total: 0,
    productPerPage: 6,
    loading: false,
    error: null,
}

export const shopReducerSlice = createSlice({
    name: 'shop',
    initialState: initState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        setProducts(state, action: PayloadAction<TProduct[]>) {
            const table: { [index: number]: number } = {};
            state.products = state.products ? [...state.products, ...action.payload].filter(({ id }) => (!table[id] && (table[id] = 1))) : action.payload;
            state.loading = false;
            state.error = null;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setTotal(state, action: PayloadAction<number>) {
            state.total = action.payload;
        }
    }
});

export default shopReducerSlice.reducer;