import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getCivs, ICiv } from '../../api/civs-api';
import { FetchStatus } from '../shared-store-utils';

export interface CivsState {
  allCivs: ICiv[];
  civPool: ICiv[];
  civsStatus: FetchStatus;
}

export const initialState: CivsState = {
  allCivs: [] as ICiv[],
  civPool: [] as ICiv[],
  civsStatus: FetchStatus.INIT,
};

export const fetchCivs = createAsyncThunk(
  'civs/fetch',
  async () => await getCivs()
);

export const civsSlice = createSlice({
  name: 'civs',
  initialState,
  reducers: {
    addAllCivsToPool: (state) => {
      state.civPool = state.allCivs;
    },
    addCivToPool: (state, action: PayloadAction<ICiv>) => {
      state.civPool.push(action.payload);
    },
    removeAllCivsFromPool: (state) => {
      state.civPool = [];
    },
    removeCivFromPool: (state, action: PayloadAction<ICiv>) => {
      state.civPool = state.civPool.filter(
        (civ) => civ.civName !== action.payload.civName
      );
    },
    updateCivPool: (state, action: PayloadAction<ICiv[]>) => {
      state.civPool = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCivs.pending, (state) => {
        state.civsStatus = FetchStatus.LOADING;
      })
      .addCase(fetchCivs.fulfilled, (state, action: PayloadAction<ICiv[]>) => {
        state.allCivs = action.payload;
        state.civsStatus = FetchStatus.FULFILLED;
      })
      .addCase(fetchCivs.rejected, (state) => {
        state.civsStatus = FetchStatus.FAILED;
      });
  },
});

export const {
  addAllCivsToPool,
  addCivToPool,
  removeAllCivsFromPool,
  removeCivFromPool,
  updateCivPool,
} = civsSlice.actions;

export const selectCivs = (state: RootState) => state.civs;

export default civsSlice.reducer;
