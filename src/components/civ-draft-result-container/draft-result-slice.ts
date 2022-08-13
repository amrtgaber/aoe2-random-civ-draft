import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICiv } from '../../api/civs-api';

export interface DraftResultState {
  civ: ICiv | null;
}

const initialState: DraftResultState = {
  civ: null,
};

export const draftResultSlice = createSlice({
  name: 'draftResult',
  initialState,
  reducers: {
    draftCiv: (state, action: PayloadAction<ICiv>) => {
      state.civ = action.payload;
    },
  },
});

export const { draftCiv } = draftResultSlice.actions;

export const selectDraftResult = (state: RootState) => state.draftResult;

export default draftResultSlice.reducer;
