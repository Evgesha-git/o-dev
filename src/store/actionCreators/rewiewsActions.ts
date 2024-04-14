import axios from "axios";
import { AppDispatch } from "..";
import { rewiewsSlice } from "../reducers/feedbackReducers";
import { TFeedback } from "../../types/feedbackTypes";

export const getRewiews = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(rewiewsSlice.actions.setLoading());
        const resp = await axios.get<TFeedback[]>('http://o-complex.com:1337/reviews');
        const data = await resp.data;
        dispatch(rewiewsSlice.actions.setRewiews(data));
    } catch (error) {
        if (axios.isAxiosError(error)){
            dispatch(rewiewsSlice.actions.setError(error.message))
        }
    }
}