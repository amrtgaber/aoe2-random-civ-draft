import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs-api';
import { IUnitTechTree } from '../../api/units-api';
import { ITechTechTree } from '../../api/techs-api';
import { IBuildingTechTree } from '../../api/buildings-api';
import { filterCivPool } from './filter-civ-pool';

export enum FilterMode {
  HAS_ALL,
  HAS_ANY,
}

export interface DraftParametersState {
  filteredCivPool: ICiv[];
  unitsFilter: IUnitTechTree[];
  techsFilter: ITechTechTree[];
  buildingsFilter: IBuildingTechTree[];
  filterMode: FilterMode;
}

export const initialState: DraftParametersState = {
  filteredCivPool: [] as ICiv[],
  unitsFilter: [] as IUnitTechTree[],
  techsFilter: [] as ITechTechTree[],
  buildingsFilter: [] as IBuildingTechTree[],
  filterMode: FilterMode.HAS_ALL,
};

export const draftParametersSlice = createSlice({
  name: 'draftParameters',
  initialState,
  reducers: {
    addUnitToFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitsFilter.push(action.payload);
      state.filteredCivPool = filterCivPool(state);
    },
    removeUnitFromFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitsFilter = state.unitsFilter.filter(
        (unit) => unit.unitName !== action.payload.unitName
      );
      state.filteredCivPool = filterCivPool(state);
    },
    updateUnitsFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitsFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearUnitsFilter: (state) => {
      state.unitsFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    addTechToFilter: (state, action: PayloadAction<ITechTechTree>) => {
      state.techsFilter.push(action.payload);
    },
    removeTechFromFilter: (state, action: PayloadAction<ITechTechTree>) => {
      state.techsFilter = state.techsFilter.filter(
        (tech) => tech.techName !== action.payload.techName
      );
    },
    updateTechsFilter: (state, action: PayloadAction<ITechTechTree[]>) => {
      state.techsFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearTechsFilter: (state) => {
      state.techsFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
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
      state.filteredCivPool = filterCivPool(state);
    },
    clearBuildingsFilter: (state) => {
      state.buildingsFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    clearFilters: (state) => {
      state.unitsFilter = [];
      state.techsFilter = [];
      state.buildingsFilter = [];
      state.filteredCivPool = [];
    },
    updateFilterMode: (state, action: PayloadAction<FilterMode>) => {
      state.filterMode = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
  },
});

export const {
  addUnitToFilter,
  removeUnitFromFilter,
  updateUnitsFilter,
  clearUnitsFilter,
  addTechToFilter,
  removeTechFromFilter,
  updateTechsFilter,
  clearTechsFilter,
  addBuildingToFilter,
  removeBuildingFromFilter,
  updateBuildingsFilter,
  clearBuildingsFilter,
  clearFilters,
  updateFilterMode,
} = draftParametersSlice.actions;

export const selectDraftParameters = (state: RootState) =>
  state.draftParameters;

export default draftParametersSlice.reducer;
