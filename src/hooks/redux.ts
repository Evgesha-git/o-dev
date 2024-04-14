import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { actions } from '../store/actionCreators';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}