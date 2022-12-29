import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { AppThunk, RootState } from './types';

export const useDispatch = () => dispatchHook<AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
