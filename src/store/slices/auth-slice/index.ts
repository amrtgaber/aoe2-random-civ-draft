import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import {
  ApiAuth,
  AuthBody,
  login,
  logout,
  refresh,
  signup,
} from '../../../api/auth/auth-api';
import { FetchStatus } from '../../fetch-status-service';

export interface AuthState {
  signupStatus: FetchStatus;
  loginStatus: FetchStatus;
  logoutStatus: FetchStatus;
  refreshStatus: FetchStatus;
}

export const authInitialState: AuthState = {
  signupStatus: FetchStatus.INIT,
  loginStatus: FetchStatus.INIT,
  logoutStatus: FetchStatus.INIT,
  refreshStatus: FetchStatus.INIT,
};

export const authSignup = createAsyncThunk(
  'auth/signup',
  async (authBody: AuthBody) => await signup(authBody)
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (authBody: AuthBody) => await login(authBody)
);

export const authLogout = createAsyncThunk(
  'auth/logout',
  async () => await logout()
);

export const authRefresh = createAsyncThunk(
  'auth/refresh',
  async () => await refresh()
);

const storeJwtTokens = (state: AuthState, action: PayloadAction<ApiAuth>) => {
  const { access_token, refresh_token } = action.payload;
  /* WARNING: local storage is a temporary solution for ease of implementation.
   * Local storage is not considered safe against xss attacks.
   * In the future the jwt tokens should be implemented in a more secure way.
   * one option: whitelisting the frontend domain so that http-only
   * cookies can be generated on the backend and used to store the tokens.
   */
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  state.signupStatus = FetchStatus.FULFILLED;
  state.loginStatus = FetchStatus.FULFILLED;
  state.refreshStatus = FetchStatus.FULFILLED;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignup.pending, (state) => {
        state.signupStatus = FetchStatus.LOADING;
      })
      .addCase(authSignup.fulfilled, storeJwtTokens)
      .addCase(authSignup.rejected, (state) => {
        state.signupStatus = FetchStatus.FAILED;
      })
      .addCase(authLogin.pending, (state) => {
        state.loginStatus = FetchStatus.LOADING;
      })
      .addCase(authLogin.fulfilled, storeJwtTokens)
      .addCase(authLogin.rejected, (state) => {
        state.loginStatus = FetchStatus.FAILED;
      })
      .addCase(authLogout.pending, (state) => {
        state.logoutStatus = FetchStatus.LOADING;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.logoutStatus = FetchStatus.FULFILLED;
      })
      .addCase(authLogout.rejected, (state) => {
        state.logoutStatus = FetchStatus.FAILED;
      })
      .addCase(authRefresh.pending, (state) => {
        state.refreshStatus = FetchStatus.LOADING;
      })
      .addCase(authRefresh.fulfilled, storeJwtTokens)
      .addCase(authRefresh.rejected, (state) => {
        state.refreshStatus = FetchStatus.FAILED;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
