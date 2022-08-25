import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getUnits, IUnitTechTree } from '../../api/units-api';

export enum FetchStatus {
  INIT,
  LOADING,
  FAILED,
  FULFILLED,
}

export interface UnitsState {
  allUnits: IUnitTechTree[];
  unitsFilter: IUnitTechTree[];
  status: FetchStatus;
}

export const initialState: UnitsState = {
  allUnits: [] as IUnitTechTree[],
  unitsFilter: [] as IUnitTechTree[],
  status: FetchStatus.INIT,
};

export const fetchUnits = createAsyncThunk(
  'units/fetch',
  async () => await getUnits()
);

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    addUnitToFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitsFilter.push(action.payload);
    },
    removeUnitFromFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitsFilter = state.unitsFilter.filter(
        (unit) => unit.unitName !== action.payload.unitName
      );
    },
    updateUnitsFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitsFilter = action.payload;
    },
    clearUnitsFilter: (state) => {
      state.unitsFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(
        fetchUnits.fulfilled,
        (state, action: PayloadAction<IUnitTechTree[]>) => {
          state.allUnits = action.payload;
          state.status = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchUnits.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      });
  },
});

export const {
  addUnitToFilter,
  removeUnitFromFilter,
  updateUnitsFilter,
  clearUnitsFilter,
} = unitsSlice.actions;

export const selectUnits = (state: RootState) => state.units;

export default unitsSlice.reducer;
