import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getBuildings, IBuildingTechTree } from '../../api/buildings-api';

export enum FetchStatus {
  INIT,
  LOADING,
  FAILED,
  FULFILLED,
}

export interface BuildingsState {
  allBuildings: IBuildingTechTree[];
  buildingsFilter: IBuildingTechTree[];
  status: FetchStatus;
}

export const initialState: BuildingsState = {
  allBuildings: [] as IBuildingTechTree[],
  buildingsFilter: [] as IBuildingTechTree[],
  status: FetchStatus.INIT,
};

export const fetchBuildings = createAsyncThunk(
  'buildings/fetch',
  async () => await getBuildings()
);

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    addBuildingToFilter: (state, action: PayloadAction<IBuildingTechTree>) => {
      state.buildingsFilter.push(action.payload);
    },
    removeBuildingFromFilter: (
      state,
      action: PayloadAction<IBuildingTechTree>
    ) => {
      state.buildingsFilter = state.buildingsFilter.filter(
        (building) => building.buildingName !== action.payload.buildingName
      );
    },
    updateBuildingsFilter: (
      state,
      action: PayloadAction<IBuildingTechTree[]>
    ) => {
      state.buildingsFilter = action.payload;
    },
    clearBuildingsFilter: (state) => {
      state.buildingsFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(
        fetchBuildings.fulfilled,
        (state, action: PayloadAction<IBuildingTechTree[]>) => {
          state.allBuildings = action.payload;
          state.status = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchBuildings.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      });
  },
});

export const {
  addBuildingToFilter,
  removeBuildingFromFilter,
  updateBuildingsFilter,
  clearBuildingsFilter,
} = buildingsSlice.actions;

export const selectBuildings = (state: RootState) => state.buildings;

export default buildingsSlice.reducer;
