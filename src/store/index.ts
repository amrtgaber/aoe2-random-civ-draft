import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import civsReducer from '../store/civs-slice';
import unitsReducer from '../store/units-slice';
import techsReducer from '../store/techs-slice';
import buildingsReducer from '../store/buildings-slice';
import agesReducer from '../store/ages-slice';
import versionReducer from '../store/version-slice';
import techTreeFilterReducer from './tech-tree-filter-slice';
import draftResultReducer from './draft-result-slice';

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
