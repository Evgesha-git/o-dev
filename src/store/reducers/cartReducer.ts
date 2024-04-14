import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCart = {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number,
    count: number,
}

type TMod = {
    id: number,
    count: number,
}

type TInit = {
    cart: TCart[] | null;
    isEmpty: boolean
}

const initState: TInit = {
    cart: null,
    isEmpty: true,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        setData(state, action: PayloadAction<TCart[] | null>) {
            state.isEmpty = action.payload ? false : true;
            state.cart = action.payload;
            state.isEmpty = state.cart ?
                state.cart.length > 0 ?
                    false :
                    true :
                true
        },
        addProduct(state, action: PayloadAction<TCart>) {
            state.cart = state.cart ? [...state.cart, action.payload] : [action.payload];
            state.isEmpty = false;
            localStorage.setItem('cart', JSON.stringify(state.cart));

        },
        modProduct(state, action: PayloadAction<TMod>) {
            const id = action.payload.id;
            state.cart = state.cart ? state.cart.map(prod => {
                if (prod.id === id) {
                    prod.count = action.payload.count;
                    return prod;
                } else {
                    return prod;
                }
            }) : null
        },
        removeProduct(state, action: PayloadAction<number>) {
            if (state.cart) {
                let cart = state.cart.filter(item => item.id !== action.payload);
                if (cart.length <= 0) {
                    state.isEmpty = true;
                    state.cart = null;
                } else {
                    state.cart = cart;
                }
            }
        },
    }
});

export default cartSlice.reducer;