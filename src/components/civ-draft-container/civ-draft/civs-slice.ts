import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../store';

export interface CivsState {
  list: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CivsState = {
  list: [],
  status: 'idle',
};

export const getCivs = createAsyncThunk('civs/fetch', async () => {
  // @TODO: implement
  // const response = await fetch(`${apiUrl}/civs`);
  // const civs = await response.json();
  return [];
});

export const civsSlice = createSlice({
  name: 'civs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCivs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCivs.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(getCivs.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {} = civsSlice.actions;

export const selectCivs = (state: RootState) => state.civs;

export default civsSlice.reducer;
