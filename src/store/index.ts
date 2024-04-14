import { configureStore, combineReducers } from '@reduxjs/toolkit';
import shopReducer from './reducers/shopReducer'; 
import rewiewsReducer from './reducers/feedbackReducers';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    shop: shopReducer,
    rewiews: rewiewsReducer,
    cart: cartReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];