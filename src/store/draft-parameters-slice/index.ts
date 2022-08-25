import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs-api';
import { IUnitTechTree } from '../../api/units-api';
import { ITechTechTree } from '../../api/techs-api';
import { IBuildingTechTree } from '../../api/buildings-api';

export interface DraftParametersState {
  filteredCivPool: ICiv[];
  unitAllFilter: IUnitTechTree[];
  unitAnyFilter: IUnitTechTree[];
  techAllFilter: ITechTechTree[];
  techAnyFilter: ITechTechTree[];
  buildingAllFilter: IBuildingTechTree[];
  buildingAnyFilter: IBuildingTechTree[];
}

export const initialState: DraftParametersState = {
  filteredCivPool: [] as ICiv[],
  unitAllFilter: [] as IUnitTechTree[],
  unitAnyFilter: [] as IUnitTechTree[],
  techAllFilter: [] as ITechTechTree[],
  techAnyFilter: [] as ITechTechTree[],
  buildingAllFilter: [] as IBuildingTechTree[],
  buildingAnyFilter: [] as IBuildingTechTree[],
};

function filterCivPool(filters: DraftParametersState): ICiv[] {
  return [] as ICiv[];
}

export const draftParametersSlice = createSlice({
  name: 'draftParameters',
  initialState,
  reducers: {
    updateUnitAllFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitAllFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearUnitAllFilter: (state) => {
      state.unitAllFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateUnitAnyFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitAnyFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearUnitAnyFilter: (state) => {
      state.unitAnyFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateTechAllFilter: (state, action: PayloadAction<ITechTechTree[]>) => {
      state.techAllFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearTechAllFilter: (state) => {
      state.techAllFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateTechAnyFilter: (state, action: PayloadAction<ITechTechTree[]>) => {
      state.techAnyFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearTechAnyFilter: (state) => {
      state.techAnyFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateBuildingAllFilter: (
      state,
      action: PayloadAction<IBuildingTechTree[]>
    ) => {
      state.buildingAllFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearBuildingAllFilter: (state) => {
      state.buildingAllFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateBuildingAnyFilter: (
      state,
      action: PayloadAction<IBuildingTechTree[]>
    ) => {
      state.buildingAnyFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearBuildingAnyFilter: (state) => {
      state.buildingAnyFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    clearFilters: (state) => {
      state.unitAllFilter = [];
      state.unitAnyFilter = [];
      state.techAllFilter = [];
      state.techAnyFilter = [];
      state.buildingAllFilter = [];
      state.buildingAnyFilter = [];
      state.filteredCivPool = [];
    },
  },
});

export const {
  updateUnitAllFilter,
  clearUnitAllFilter,
  updateUnitAnyFilter,
  clearUnitAnyFilter,
  updateTechAllFilter,
  clearTechAllFilter,
  updateTechAnyFilter,
  clearTechAnyFilter,
  updateBuildingAllFilter,
  clearBuildingAllFilter,
  updateBuildingAnyFilter,
  clearBuildingAnyFilter,
  clearFilters,
} = draftParametersSlice.actions;

export const selectDraftParameters = (state: RootState) =>
  state.draftParameters;

export default draftParametersSlice.reducer;
