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
  buildingAllFilter: IBuildingTechTree[];
  buildingAnyFilter: IBuildingTechTree[];
  status: FetchStatus;
}

export const initialState: BuildingsState = {
  allBuildings: [] as IBuildingTechTree[],
  buildingAllFilter: [] as IBuildingTechTree[],
  buildingAnyFilter: [] as IBuildingTechTree[],
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
    addBuildingToAllFilter: (
      state,
      action: PayloadAction<IBuildingTechTree>
    ) => {
      state.buildingAllFilter.push(action.payload);
    },
    removeBuildingFromAllFilter: (
      state,
      action: PayloadAction<IBuildingTechTree>
    ) => {
      state.buildingAllFilter = state.buildingAllFilter.filter(
        (building) => building.buildingName !== action.payload.buildingName
      );
    },
    updateBuildingAllFilter: (
      state,
      action: PayloadAction<IBuildingTechTree[]>
    ) => {
      state.buildingAllFilter = action.payload;
    },
    clearAllFilter: (state) => {
      state.buildingAllFilter = [];
    },
    addBuildingToAnyFilter: (
      state,
      action: PayloadAction<IBuildingTechTree>
    ) => {
      state.buildingAnyFilter.push(action.payload);
    },
    removeBuildingFromAnyFilter: (
      state,
      action: PayloadAction<IBuildingTechTree>
    ) => {
      state.buildingAnyFilter = state.buildingAnyFilter.filter(
        (building) => building.buildingName !== action.payload.buildingName
      );
    },
    updateBuildingAnyFilter: (
      state,
      action: PayloadAction<IBuildingTechTree[]>
    ) => {
      state.buildingAnyFilter = action.payload;
    },
    clearAnyFilter: (state) => {
      state.buildingAnyFilter = [];
    },
    clearFilters: (state) => {
      state.buildingAllFilter = [];
      state.buildingAnyFilter = [];
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
  addBuildingToAllFilter,
  removeBuildingFromAllFilter,
  updateBuildingAllFilter,
  clearAllFilter,
  addBuildingToAnyFilter,
  removeBuildingFromAnyFilter,
  updateBuildingAnyFilter,
  clearAnyFilter,
  clearFilters,
} = buildingsSlice.actions;

export const selectBuildings = (state: RootState) => state.buildings;

export default buildingsSlice.reducer;
