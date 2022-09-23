import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { getBuildings, IBuilding } from '../../../api/buildings/buildings-api';
import { FetchStatus } from '../../fetch-status-service';

export interface BuildingsState {
  allBuildings: IBuilding[];
  buildingsStatus: FetchStatus;
}

export const initialState: BuildingsState = {
  allBuildings: [] as IBuilding[],
  buildingsStatus: FetchStatus.INIT,
};

export const fetchBuildings = createAsyncThunk(
  'buildings/fetch',
  async () => await getBuildings()
);

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.buildingsStatus = FetchStatus.LOADING;
      })
      .addCase(
        fetchBuildings.fulfilled,
        (state, action: PayloadAction<IBuilding[]>) => {
          state.allBuildings = action.payload;
          state.buildingsStatus = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchBuildings.rejected, (state) => {
        state.buildingsStatus = FetchStatus.FAILED;
      });
  },
});

export const selectBuildings = (state: RootState) => state.buildings;

export default buildingsSlice.reducer;
