import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs-api';
import { IUnitTechTree } from '../../api/units-api';
import { ITechTechTree } from '../../api/techs-api';
import { IBuildingTechTree } from '../../api/buildings-api';

export interface DraftParametersState {
  filteredCivPool: ICiv[];
  unitsFilter: IUnitTechTree[];
  techsFilter: ITechTechTree[];
  buildingsFilter: IBuildingTechTree[];
  isAllFilter: boolean;
}

export const initialState: DraftParametersState = {
  filteredCivPool: [] as ICiv[],
  unitsFilter: [] as IUnitTechTree[],
  techsFilter: [] as ITechTechTree[],
  buildingsFilter: [] as IBuildingTechTree[],
  isAllFilter: true,
};

function filterCivPool(filters: DraftParametersState): ICiv[] {
  return [] as ICiv[];
}

export const draftParametersSlice = createSlice({
  name: 'draftParameters',
  initialState,
  reducers: {
    updateUnitsFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitsFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearUnitsFilter: (state) => {
      state.unitsFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateTechsFilter: (state, action: PayloadAction<ITechTechTree[]>) => {
      state.techsFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearTechsFilter: (state) => {
      state.techsFilter = [];
      state.filteredCivPool = filterCivPool(state);
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
    updateIsAllFilter: (state, action: PayloadAction<boolean>) => {
      state.isAllFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
  },
});

export const {
  updateUnitsFilter,
  clearUnitsFilter,
  updateTechsFilter,
  clearTechsFilter,
  updateBuildingsFilter,
  clearBuildingsFilter,
  clearFilters,
} = draftParametersSlice.actions;

export const selectDraftParameters = (state: RootState) =>
  state.draftParameters;

export default draftParametersSlice.reducer;
