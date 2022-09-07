import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import draftResultReducer from './draft-result-slice';
import civsReducer from '../store/civs-slice';
import unitsReducer from '../store/units-slice';
import techsReducer from '../store/techs-slice';
import buildingsReducer from '../store/buildings-slice';
import draftParametersReducer from '../store/draft-parameters-slice';
import versionReducer from '../store/version-slice';

export const store = configureStore({
  reducer: {
    draftResult: draftResultReducer,
    civs: civsReducer,
    units: unitsReducer,
    techs: techsReducer,
    buildings: buildingsReducer,
    draftParameters: draftParametersReducer,
    version: versionReducer,
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
