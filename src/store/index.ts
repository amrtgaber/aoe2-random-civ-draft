import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import civsReducer from '../components/civ-draft-container/civ-draft/civs-slice';

export const store = configureStore({
  reducer: {
    civs: civsReducer,
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
