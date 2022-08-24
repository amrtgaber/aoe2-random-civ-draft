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
  unitAllFilter: IUnitTechTree[];
  unitAnyFilter: IUnitTechTree[];
  status: FetchStatus;
}

export const initialState: UnitsState = {
  allUnits: [] as IUnitTechTree[],
  unitAllFilter: [] as IUnitTechTree[],
  unitAnyFilter: [] as IUnitTechTree[],
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
    addUnitToAllFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitAllFilter.push(action.payload);
    },
    removeUnitFromAllFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitAllFilter = state.unitAllFilter.filter(
        (unit) => unit.unitName !== action.payload.unitName
      );
    },
    updateUnitAllFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitAllFilter = action.payload;
    },
    clearAllFilter: (state) => {
      state.unitAllFilter = [];
    },
    addUnitToAnyFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitAnyFilter.push(action.payload);
    },
    removeUnitFromAnyFilter: (state, action: PayloadAction<IUnitTechTree>) => {
      state.unitAnyFilter = state.unitAnyFilter.filter(
        (unit) => unit.unitName !== action.payload.unitName
      );
    },
    updateUnitAnyFilter: (state, action: PayloadAction<IUnitTechTree[]>) => {
      state.unitAnyFilter = action.payload;
    },
    clearAnyFilter: (state) => {
      state.unitAnyFilter = [];
    },
    clearFilters: (state) => {
      state.unitAllFilter = [];
      state.unitAnyFilter = [];
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
  addUnitToAllFilter,
  removeUnitFromAllFilter,
  updateUnitAllFilter,
  clearAllFilter,
  addUnitToAnyFilter,
  removeUnitFromAnyFilter,
  updateUnitAnyFilter,
  clearAnyFilter,
  clearFilters,
} = unitsSlice.actions;

export const selectUnits = (state: RootState) => state.units;

export default unitsSlice.reducer;
