import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getTechs, ITechTechTree } from '../../api/techs-api';

export enum FetchStatus {
  INIT,
  LOADING,
  FAILED,
  FULFILLED,
}

export interface TechsState {
  allTechs: ITechTechTree[];
  techAllFilter: ITechTechTree[];
  techAnyFilter: ITechTechTree[];
  status: FetchStatus;
}

export const initialState: TechsState = {
  allTechs: [] as ITechTechTree[],
  techAllFilter: [] as ITechTechTree[],
  techAnyFilter: [] as ITechTechTree[],
  status: FetchStatus.INIT,
};

export const fetchTechs = createAsyncThunk(
  'techs/fetch',
  async () => await getTechs()
);

export const techsSlice = createSlice({
  name: 'techs',
  initialState,
  reducers: {
    addTechToAllFilter: (state, action: PayloadAction<ITechTechTree>) => {
      state.techAllFilter.push(action.payload);
    },
    removeTechFromAllFilter: (state, action: PayloadAction<ITechTechTree>) => {
      state.techAllFilter = state.techAllFilter.filter(
        (tech) => tech.techName !== action.payload.techName
      );
    },
    updateTechAllFilter: (state, action: PayloadAction<ITechTechTree[]>) => {
      state.techAllFilter = action.payload;
    },
    clearAllFilter: (state) => {
      state.techAllFilter = [];
    },
    addTechToAnyFilter: (state, action: PayloadAction<ITechTechTree>) => {
      state.techAnyFilter.push(action.payload);
    },
    removeTechFromAnyFilter: (state, action: PayloadAction<ITechTechTree>) => {
      state.techAnyFilter = state.techAnyFilter.filter(
        (tech) => tech.techName !== action.payload.techName
      );
    },
    updateTechAnyFilter: (state, action: PayloadAction<ITechTechTree[]>) => {
      state.techAnyFilter = action.payload;
    },
    clearAnyFilter: (state) => {
      state.techAnyFilter = [];
    },
    clearFilters: (state) => {
      state.techAllFilter = [];
      state.techAnyFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechs.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(
        fetchTechs.fulfilled,
        (state, action: PayloadAction<ITechTechTree[]>) => {
          state.allTechs = action.payload;
          state.status = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchTechs.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      });
  },
});

export const {
  addTechToAllFilter,
  removeTechFromAllFilter,
  updateTechAllFilter,
  clearAllFilter,
  addTechToAnyFilter,
  removeTechFromAnyFilter,
  updateTechAnyFilter,
  clearAnyFilter,
  clearFilters,
} = techsSlice.actions;

export const selectTechs = (state: RootState) => state.techs;

export default techsSlice.reducer;
