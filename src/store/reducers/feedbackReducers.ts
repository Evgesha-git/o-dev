import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeedback } from '../../types/feedbackTypes';

type TInit = {
    rewiews: TFeedback[] | null,
    isLoading: boolean,
    error: string | null
};

const initState: TInit = {
    rewiews: null,
    isLoading: false,
    error: null,
};

export const rewiewsSlice = createSlice({
    name: 'rewiews',
    initialState: initState,
    reducers: {
        setRewiews(state, action: PayloadAction<TFeedback[]>){
            state.isLoading = false;
            state.rewiews = action.payload;
            state.error = null;
        },
        setLoading(state){
            state.isLoading = true;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default rewiewsSlice.reducer