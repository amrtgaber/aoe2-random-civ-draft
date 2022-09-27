import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { ICiv } from '../../../api/civs/civs-api';

export interface DraftResultState {
  civ: ICiv | null;
  draftCount: number;
}

export const draftResultinitialState: DraftResultState = {
  civ: null,
  draftCount: 0,
};

export const draftResultSlice = createSlice({
  name: 'draftResult',
  initialState: draftResultinitialState,
  reducers: {
    draftCiv: (state, action: PayloadAction<ICiv>) => {
      state.civ = action.payload;
      state.draftCount++;
    },
  },
});

export const { draftCiv } = draftResultSlice.actions;

export const selectDraftResult = (state: RootState) => state.draftResult;

export default draftResultSlice.reducer;
