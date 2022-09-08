import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getVersion } from '../../api/version/version-api';
import { FetchStatus } from '../shared-store-utils';

export interface VersionState {
  gameVersion: string;
  versionStatus: FetchStatus;
}

export const initialState: VersionState = {
  gameVersion: '',
  versionStatus: FetchStatus.INIT,
};

export const fetchVersion = createAsyncThunk(
  'version/fetch',
  async () => await getVersion()
);

export const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVersion.pending, (state) => {
        state.versionStatus = FetchStatus.LOADING;
      })
      .addCase(
        fetchVersion.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.gameVersion = action.payload;
          state.versionStatus = FetchStatus.FULFILLED;
        }
      )
      .addCase(fetchVersion.rejected, (state) => {
        state.versionStatus = FetchStatus.FAILED;
      });
  },
});

export const selectVersion = (state: RootState) => state.version;

export default versionSlice.reducer;
