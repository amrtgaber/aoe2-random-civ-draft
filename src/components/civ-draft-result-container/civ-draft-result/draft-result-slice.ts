import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { ICiv } from '../../../api/civs-api';

export enum DraftResultStatus {
  INIT,
  DRAFTED,
}

export interface DraftResultState {
  civ: ICiv | null;
  status: DraftResultStatus;
}

const initialState: DraftResultState = {
  civ: null,
  status: DraftResultStatus.INIT,
};

export const draftResultSlice = createSlice({
  name: 'draftResult',
  initialState,
  reducers: {
    draftCiv: (state, action: PayloadAction<ICiv>) => {
      state.civ = action.payload;
      state.status = DraftResultStatus.DRAFTED;
    },
  },
});

export const { draftCiv } = draftResultSlice.actions;

export const selectDraftResult = (state: RootState) => state.draftResult;

export default draftResultSlice.reducer;
