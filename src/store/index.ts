import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import civsReducer from '../store/civs-slice';
import draftResultReducer from './draft-result-slice';

export const store = configureStore({
  reducer: {
    civs: civsReducer,
    draftResult: draftResultReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
