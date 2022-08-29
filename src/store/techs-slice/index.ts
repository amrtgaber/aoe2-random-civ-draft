import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getTechs, ITechTechTree } from '../../api/techs-api';
import { FetchStatus } from '../shared-store-utils';

export interface TechsState {
  allTechs: ITechTechTree[];
  techsFilter: ITechTechTree[];
  techsStatus: FetchStatus;
}

export const initialState: TechsState = {
  allTechs: [] as ITechTechTree[],
  techsFilter: [] as ITechTechTree[],
  techsStatus: FetchStatus.INIT,
};

export const fetchTechs = createAsyncThunk(
  'techs/fetch',
  async () => await getTechs()
);

export const techsSlice = createSlice({
  name: 'techs',
  initialState,
  reducers: {
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
    },
    clearTechsFilter: (state) => {
      state.techsFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechs.pending, (state) => {
        state.techsStatus = FetchStatus.LOADING;
      })
      .addCase(
        fetchTechs.fulfilled,
        (state, action: PayloadAction<ITechTechTree[]>) => {
          state.allTechs = action.payload;
          state.techsStatus = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchTechs.rejected, (state) => {
        state.techsStatus = FetchStatus.FAILED;
      });
  },
});

export const {
  addTechToFilter,
  removeTechFromFilter,
  updateTechsFilter,
  clearTechsFilter,
} = techsSlice.actions;

export const selectTechs = (state: RootState) => state.techs;

export default techsSlice.reducer;
