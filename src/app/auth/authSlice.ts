import { createSlice } from '@reduxjs/toolkit';
import { userLogin, registerUser } from './authActions';

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.getItem(key)
  ? localStorage.getItem(key)
  : null;
}

// initialize userToken from local storage
const userToken = getFromLocalStorage("authToken");

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.data.access_token
      })
      .addCase(userLogin.rejected,  (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
