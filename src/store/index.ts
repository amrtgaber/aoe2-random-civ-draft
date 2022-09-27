import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import civsReducer from './slices/civs-slice';
import unitsReducer from './slices/units-slice';
import techsReducer from './slices/techs-slice';
import buildingsReducer from './slices/buildings-slice';
import agesReducer from './slices/ages-slice';
import versionReducer from './slices/version-slice';
import techTreeFilterReducer from './slices/tech-tree-filter-slice';
import draftResultReducer from './slices/draft-result-slice';

export const reducer = {
  civs: civsReducer,
  units: unitsReducer,
  techs: techsReducer,
  buildings: buildingsReducer,
  ages: agesReducer,
  version: versionReducer,
  techTreeFilter: techTreeFilterReducer,
  draftResult: draftResultReducer,
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
