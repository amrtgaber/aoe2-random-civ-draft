import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getAges, IAge } from '../../api/ages/ages-api';
import { FetchStatus } from '../shared-store-utils';

export interface AgesState {
  ages: IAge[];
  agesStatus: FetchStatus;
}

export const initialState: AgesState = {
  ages: [] as IAge[],
  agesStatus: FetchStatus.INIT,
};

export const fetchAges = createAsyncThunk(
  'ages/fetch',
  async () => await getAges()
);

export const agesSlice = createSlice({
  name: 'ages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAges.pending, (state) => {
        state.agesStatus = FetchStatus.LOADING;
      })
      .addCase(fetchAges.fulfilled, (state, action: PayloadAction<IAge[]>) => {
        state.ages = action.payload;
        state.agesStatus = FetchStatus.FULFILLED;
      })
      .addCase(fetchAges.rejected, (state) => {
        state.agesStatus = FetchStatus.FAILED;
      });
  },
});

export const selectAges = (state: RootState) => state.ages;

export default agesSlice.reducer;
