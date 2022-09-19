import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ICiv } from '../../api/civs/civs-api';
import { filterCivPool } from './filter-civ-pool';
import { ITechTreeItem } from '../../api/tech-tree-item-api';

import {
  getTagIdsByType,
  TagType,
} from './TechTreeFilterService/TagsService/tags';
import { SortBy } from './TechTreeFilterService/SortService';
import { assembleShownItemsOnChange } from './TechTreeFilterService';

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
  selectedTagIds: number[];
}

export const initialState: TechTreeFilterState = {
  filteredCivPool: [] as ICiv[],
  itemsFilter: [] as ITechTreeItem[],
  filterMode: FilterMode.HAS_ALL,

  shownItems: [] as ITechTreeItem[],
  taggedItems: [] as ITechTreeItem[],

  searchTerm: '',
  sortMode: SortBy.ALPHA,
  selectedTagIds: getTagIdsByType(TagType.KIND),
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
    setSelectedTagIds: (state, action: PayloadAction<number[]>) => {
      state.selectedTagIds = action.payload;
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
  setSelectedTagIds,
} = techTreeFilterSlice.actions;

export const selectTechTreeFilter = (state: RootState) => state.techTreeFilter;

export default techTreeFilterSlice.reducer;
