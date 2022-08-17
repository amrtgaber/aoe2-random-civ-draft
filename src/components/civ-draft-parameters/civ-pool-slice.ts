import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICiv } from '../../api/civs-api';

export interface CivPoolState {
  pool: ICiv[];
}

const initialState: CivPoolState = {
  pool: [] as ICiv[],
};

export const civPoolSlice = createSlice({
  name: 'civPool',
  initialState,
  reducers: {
    addAllCivs: (state, action: PayloadAction<ICiv[]>) => {
      state.pool = action.payload;
    },
    addCiv: (state, action: PayloadAction<ICiv>) => {
      state.pool.push(action.payload);
    },
    removeAllCivs: (state) => {
      state.pool = [];
    },
    removeCiv: (state, action: PayloadAction<ICiv>) => {
      state.pool = state.pool.filter(
        (civ) => civ.civName !== action.payload.civName
      );
    },
  },
});

export const { addAllCivs, addCiv, removeAllCivs, removeCiv } =
  civPoolSlice.actions;

export const selectCivPool = (state: RootState) => state.civPool;

export default civPoolSlice.reducer;
