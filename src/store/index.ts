import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import civsReducer from '../components/civ-draft/civs-slice';
import draftResultReducer from '../components/civ-draft-result-container/civ-draft-result/draft-result-slice';

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
