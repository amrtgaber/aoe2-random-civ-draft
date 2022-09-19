import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs/civs-api';
import { filterCivPool } from './filter-civ-pool';
import { ITechTreeItem } from '../../api/tech-tree-item-api';

import { doSort, SortBy } from './tech-tree-filter-service/sort-service';
import { assembleShownItemsOnChange } from './tech-tree-filter-service';
import { FilterTag } from './tech-tree-filter-service/tags-service/tags';

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

  searchTerm: string;
  sortMode: SortBy;
  selectedTags: FilterTag[];
}

export const initialState: TechTreeFilterState = {
  filteredCivPool: [] as ICiv[],
  itemsFilter: [] as ITechTreeItem[],
  filterMode: FilterMode.HAS_ALL,

  shownItems: [] as ITechTreeItem[],
  taggedItems: [] as ITechTreeItem[],

  searchTerm: '',
  sortMode: SortBy.ALPHA,
  selectedTags: [],
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
      state.shownItems = assembleShownItemsOnChange(state);
    },
    setFilterMode: (state, action: PayloadAction<FilterMode>) => {
      state.filterMode = action.payload;
      state.filteredCivPool = filterCivPool(state);
    },

    addShownItem: (state, action: PayloadAction<ITechTreeItem>) => {
      state.shownItems.push(action.payload);
      state.shownItems = assembleShownItemsOnChange(state);
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
      state.taggedItems = doSort(action.payload, state.sortMode);
      state.shownItems = assembleShownItemsOnChange(state);
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.shownItems = assembleShownItemsOnChange(state);
    },
    setSortMode: (state, action: PayloadAction<SortBy>) => {
      state.sortMode = action.payload;
      state.shownItems = assembleShownItemsOnChange(state);
    },
    setSelectedTags: (state, action: PayloadAction<FilterTag[]>) => {
      state.selectedTags = action.payload;
      state.shownItems = assembleShownItemsOnChange(state);
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
  setSearchTerm,
  setSortMode,
  setSelectedTags,
} = techTreeFilterSlice.actions;

export const selectTechTreeFilter = (state: RootState) => state.techTreeFilter;

export default techTreeFilterSlice.reducer;
