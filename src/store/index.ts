import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import agesReducer from './slices/ages-slice';
import authReducer from './slices/auth-slice';
import buildingsReducer from './slices/buildings-slice';
import civsReducer from './slices/civs-slice';
import draftResultReducer from './slices/draft-result-slice';
import draftsReducer from './slices/drafts-slice';
import snackbarReducer from './slices/snackbar-slice';
import techTreeFilterReducer from './slices/tech-tree-filter-slice';
import techsReducer from './slices/techs-slice';
import unitsReducer from './slices/units-slice';
import usersReducer from './slices/users-slice';
import versionReducer from './slices/version-slice';

export const reducer = {
  auth: authReducer,
  users: usersReducer,
  civs: civsReducer,
  units: unitsReducer,
  techs: techsReducer,
  buildings: buildingsReducer,
  ages: agesReducer,
  version: versionReducer,
  techTreeFilter: techTreeFilterReducer,
  draftResult: draftResultReducer,
  drafts: draftsReducer,
  snackbar: snackbarReducer,
};

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
