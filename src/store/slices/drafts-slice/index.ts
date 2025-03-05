import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import {
  createDraft,
  CreateDraftBody,
  deleteDraft,
  getDraft,
  getDrafts,
  IDraft,
  updateDraft,
  UpdateDraftBody,
} from '../../../api/drafts/drafts-api';
import { FetchStatus } from '../../fetch-status-service';

export interface DraftsState {
  draft: IDraft | null;
  drafts: IDraft[];
  draftGetStatus: FetchStatus;
  draftsGetStatus: FetchStatus;
  draftUpdateStatus: FetchStatus;
  draftDeleteStatus: FetchStatus;
}

export const draftsInitialState: DraftsState = {
  draft: null,
  drafts: [],
  draftGetStatus: FetchStatus.INIT,
  draftsGetStatus: FetchStatus.INIT,
  draftUpdateStatus: FetchStatus.INIT,
  draftDeleteStatus: FetchStatus.INIT,
};

export const draftCreate = createAsyncThunk(
  'draft/update',
  async (body: CreateDraftBody) => await createDraft(body),
);

export const draftsGet = createAsyncThunk(
  'draft/getAll',
  async () => await getDrafts(),
);

export const draftGet = createAsyncThunk(
  'draft/get',
  async (id: string) => await getDraft(id),
);

export const draftUpdate = createAsyncThunk(
  'draft/update',
  async ({ id, body }: { id: number; body: UpdateDraftBody }) =>
    await updateDraft(id, body),
);

export const draftDelete = createAsyncThunk(
  'draft/delete',
  async (id: number) => await deleteDraft(id),
);

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState: draftsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(draftsGet.pending, (state) => {
        state.draftsGetStatus = FetchStatus.LOADING;
      })
      .addCase(
        draftsGet.fulfilled,
        (state, action: PayloadAction<IDraft[]>) => {
          state.drafts = action.payload;
          state.draftsGetStatus = FetchStatus.FULFILLED;
        },
      )
      .addCase(draftsGet.rejected, (state) => {
        state.draftsGetStatus = FetchStatus.FAILED;
      })
      .addCase(draftGet.pending, (state) => {
        state.draftGetStatus = FetchStatus.LOADING;
      })
      .addCase(draftGet.fulfilled, (state, action: PayloadAction<IDraft>) => {
        state.draft = action.payload;
        state.draftGetStatus = FetchStatus.FULFILLED;
      })
      .addCase(draftGet.rejected, (state) => {
        state.draftGetStatus = FetchStatus.FAILED;
      })
      .addCase(draftUpdate.pending, (state) => {
        state.draftUpdateStatus = FetchStatus.LOADING;
      })
      .addCase(
        draftUpdate.fulfilled,
        (state, action: PayloadAction<IDraft>) => {
          state.draftUpdateStatus = FetchStatus.FULFILLED;
        },
      )
      .addCase(draftUpdate.rejected, (state) => {
        state.draftUpdateStatus = FetchStatus.FAILED;
      })
      .addCase(draftDelete.pending, (state) => {
        state.draftDeleteStatus = FetchStatus.LOADING;
      })
      .addCase(draftDelete.fulfilled, (state) => {
        state.draftDeleteStatus = FetchStatus.FULFILLED;
      })
      .addCase(draftDelete.rejected, (state) => {
        state.draftDeleteStatus = FetchStatus.FAILED;
      });
  },
});

export const selectDrafts = (state: RootState) => state.drafts;

export default draftsSlice.reducer;
