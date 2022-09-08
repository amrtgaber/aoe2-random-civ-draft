import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs/civs-api';
import { filterCivPool } from './filter-civ-pool';
import { ITechTreeItem } from '../../api/tech-tree-item-api';

export enum FilterMode {
  HAS_ALL,
  HAS_ANY,
}

export interface DraftParametersState {
  filteredCivPool: ICiv[];
  itemsFilter: ITechTreeItem[];
  filterMode: FilterMode;
}

export const initialState: DraftParametersState = {
  filteredCivPool: [] as ICiv[],
  itemsFilter: [] as ITechTreeItem[],
  filterMode: FilterMode.HAS_ALL,
};

export const draftParametersSlice = createSlice({
  name: 'draftParameters',
  initialState,
  reducers: {
    addItemToFilter: (state, action: PayloadAction<ITechTreeItem>) => {
      state.itemsFilter.push(action.payload);
      state.filteredCivPool = filterCivPool(state);
    },
    removeItemFromFilter: (state, action: PayloadAction<ITechTreeItem>) => {
      state.itemsFilter = state.itemsFilter.filter(
        (item) => item.itemName !== action.payload.itemName
      );
      state.filteredCivPool = filterCivPool(state);
    },
    updateFilter: (state, action: PayloadAction<ITechTreeItem[]>) => {
      state.itemsFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearFilter: (state) => {
      state.itemsFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    updateFilterMode: (state, action: PayloadAction<FilterMode>) => {
      state.filterMode = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
  },
});

export const {
  addItemToFilter,
  removeItemFromFilter,
  updateFilter,
  clearFilter,
  updateFilterMode,
} = draftParametersSlice.actions;

export const selectDraftParameters = (state: RootState) =>
  state.draftParameters;

export default draftParametersSlice.reducer;
