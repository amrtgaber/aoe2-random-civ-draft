import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getAges, IAgeTechTree } from '../../api/ages/ages-api';
import { FetchStatus } from '../shared-store-utils';

export interface AgesState {
  allAges: IAgeTechTree[];
  agesStatus: FetchStatus;
}

export const initialState: AgesState = {
  allAges: [] as IAgeTechTree[],
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
      .addCase(
        fetchAges.fulfilled,
        (state, action: PayloadAction<IAgeTechTree[]>) => {
          state.allAges = action.payload;
          state.agesStatus = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchAges.rejected, (state) => {
        state.agesStatus = FetchStatus.FAILED;
      });
  },
});

export const selectAges = (state: RootState) => state.ages;

export default agesSlice.reducer;
