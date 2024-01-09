import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

export interface SnackbarState {
  message: string;
}

export const snackbarInitialState: SnackbarState = {
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: snackbarInitialState,
  reducers: {
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setSnackbarMessage } = snackbarSlice.actions;
export const selectSnackbar = (state: RootState) => state.snackbar;
export default snackbarSlice.reducer;
