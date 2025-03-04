import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import {
  deleteUser,
  getUser,
  IUser,
  updateUser,
  UpdateUserBody,
} from '../../../api/users/users-api';
import { FetchStatus } from '../../fetch-status-service';

export interface UsersState {
  user: IUser | null;
  userGetStatus: FetchStatus;
  userUpdateStatus: FetchStatus;
  userDeleteStatus: FetchStatus;
}

export const usersInitialState: UsersState = {
  user: null,
  userGetStatus: FetchStatus.INIT,
  userUpdateStatus: FetchStatus.INIT,
  userDeleteStatus: FetchStatus.INIT,
};

export const userGet = createAsyncThunk(
  'user/get',
  async () => await getUser(),
);

export const userUpdate = createAsyncThunk(
  'user/update',
  async (body: UpdateUserBody) => await updateUser(body),
);

export const userDelete = createAsyncThunk(
  'user/delete',
  async () => await deleteUser(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {
    userLogout: (state) => {
      state.userGetStatus = FetchStatus.INIT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGet.pending, (state) => {
        state.userGetStatus = FetchStatus.LOADING;
      })
      .addCase(userGet.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.userGetStatus = FetchStatus.FULFILLED;
      })
      .addCase(userGet.rejected, (state) => {
        state.userGetStatus = FetchStatus.FAILED;
      })
      .addCase(userUpdate.pending, (state) => {
        state.userUpdateStatus = FetchStatus.LOADING;
      })
      .addCase(userUpdate.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.userUpdateStatus = FetchStatus.FULFILLED;
      })
      .addCase(userUpdate.rejected, (state) => {
        state.userUpdateStatus = FetchStatus.FAILED;
      })
      .addCase(userDelete.pending, (state) => {
        state.userDeleteStatus = FetchStatus.LOADING;
      })
      .addCase(userDelete.fulfilled, (state) => {
        state.userDeleteStatus = FetchStatus.FULFILLED;
      })
      .addCase(userDelete.rejected, (state) => {
        state.userDeleteStatus = FetchStatus.FAILED;
      });
  },
});

export const { userLogout } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
