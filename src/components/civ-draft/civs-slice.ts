import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getCivs, ICiv } from '../../api/civs-api';

export enum FetchStatus {
  INIT,
  LOADING,
  FAILED,
  FULFILLED,
}

export interface CivsState {
  list: ICiv[];
  status: FetchStatus;
}

const initialState: CivsState = {
  list: [] as ICiv[],
  status: FetchStatus.INIT,
};

export const fetchCivs = createAsyncThunk(
  'civs/fetch',
  async () => await getCivs()
);

export const civsSlice = createSlice({
  name: 'civs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCivs.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(fetchCivs.fulfilled, (state, action: PayloadAction<ICiv[]>) => {
        state.list = action.payload;
        state.status = FetchStatus.FULFILLED;
      })
      .addCase(fetchCivs.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      });
  },
});

export const selectCivs = (state: RootState) => state.civs;

export default civsSlice.reducer;
