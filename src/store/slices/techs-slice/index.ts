import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { getTechs, ITech } from '../../../api/techs/techs-api';
import { FetchStatus } from '../../fetch-status-service';

export interface TechsState {
  allTechs: ITech[];
  techsStatus: FetchStatus;
}

export const techsInitialState: TechsState = {
  allTechs: [] as ITech[],
  techsStatus: FetchStatus.INIT,
};

export const fetchTechs = createAsyncThunk(
  'techs/fetch',
  async () => await getTechs()
);

export const techsSlice = createSlice({
  name: 'techs',
  initialState: techsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechs.pending, (state) => {
        state.techsStatus = FetchStatus.LOADING;
      })
      .addCase(
        fetchTechs.fulfilled,
        (state, action: PayloadAction<ITech[]>) => {
          state.allTechs = action.payload;
          state.techsStatus = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchTechs.rejected, (state) => {
        state.techsStatus = FetchStatus.FAILED;
      });
  },
});

export const selectTechs = (state: RootState) => state.techs;

export default techsSlice.reducer;
