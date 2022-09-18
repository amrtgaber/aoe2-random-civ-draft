import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs/civs-api';
import { filterCivPool } from './filter-civ-pool';
import { ITechTreeItem } from '../../api/tech-tree-item-api';

export enum FilterMode {
  HAS_ALL = 'ALL',
  HAS_ANY = 'ANY',
}

export interface TechTreeFilterState {
  filteredCivPool: ICiv[];
  itemsFilter: ITechTreeItem[];
  filterMode: FilterMode;
  shownItems: ITechTreeItem[];
  taggedItems: ITechTreeItem[];
}

export const initialState: TechTreeFilterState = {
  filteredCivPool: [] as ICiv[],
  itemsFilter: [] as ITechTreeItem[],
  filterMode: FilterMode.HAS_ALL,
  shownItems: [] as ITechTreeItem[],
  taggedItems: [] as ITechTreeItem[],
};

export const techTreeFilterSlice = createSlice({
  name: 'techTreeFilter',
  initialState,
  reducers: {
    addItemToFilter: (state, action: PayloadAction<ITechTreeItem>) => {
      state.itemsFilter.push(action.payload);
      state.filteredCivPool = filterCivPool(state);
    },
    removeItemFromFilter: (state, action: PayloadAction<ITechTreeItem>) => {
      state.itemsFilter = state.itemsFilter.filter(
        (item) => item.id !== action.payload.id
      );
      state.filteredCivPool = filterCivPool(state);
    },
    setItemsFilter: (state, action: PayloadAction<ITechTreeItem[]>) => {
      state.itemsFilter = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    clearFilter: (state) => {
      state.itemsFilter = [];
      state.filteredCivPool = filterCivPool(state);
    },
    setFilterMode: (state, action: PayloadAction<FilterMode>) => {
      state.filterMode = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },
    addShownItem: (state, action: PayloadAction<ITechTreeItem>) => {
      state.shownItems.push(action.payload);
    },
    removeShownItem: (state, action: PayloadAction<ITechTreeItem>) => {
      state.shownItems = state.shownItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setShownItems: (state, action: PayloadAction<ITechTreeItem[]>) => {
      state.shownItems = action.payload;
    },
    setTaggedItems: (state, action: PayloadAction<ITechTreeItem[]>) => {
      state.taggedItems = action.payload;
    },
  },
});

export const {
  addItemToFilter,
  removeItemFromFilter,
  setItemsFilter,
  clearFilter,
  setFilterMode,
  addShownItem,
  removeShownItem,
  setShownItems,
  setTaggedItems,
} = techTreeFilterSlice.actions;

export const selectTechTreeFilter = (state: RootState) => state.techTreeFilter;

export default techTreeFilterSlice.reducer;
