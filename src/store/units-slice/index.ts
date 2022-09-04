import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getUnits, IUnit } from '../../api/units-api';
import { FetchStatus } from '../shared-store-utils';

export interface UnitsState {
  allUnits: IUnit[];
  unitsStatus: FetchStatus;
}

export const initialState: UnitsState = {
  allUnits: [] as IUnit[],
  unitsStatus: FetchStatus.INIT,
};

export const fetchUnits = createAsyncThunk(
  'units/fetch',
  async () => await getUnits()
);

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.unitsStatus = FetchStatus.LOADING;
      })
      .addCase(
        fetchUnits.fulfilled,
        (state, action: PayloadAction<IUnit[]>) => {
          state.allUnits = action.payload;
          state.unitsStatus = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchUnits.rejected, (state) => {
        state.unitsStatus = FetchStatus.FAILED;
      });
  },
});

export const selectUnits = (state: RootState) => state.units;

export default unitsSlice.reducer;
