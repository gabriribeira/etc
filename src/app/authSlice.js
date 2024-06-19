// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import api from './api';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: null,
    user: null,
    currentHouseholdId: null,
    role: null,
  },
  reducers: {
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.currentHouseholdId = action.payload.currentHouseholdId;
      state.role = action.payload.roleId;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.currentHouseholdId = null;
      state.role = null;
    },
    updateUserState: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.currentHouseholdId = action.payload.currentHouseholdId;
        state.role = action.payload.roleId;
      })
      .addMatcher(api.endpoints.googleAuthCallback.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.currentHouseholdId = action.payload.currentHouseholdId;
        state.role = action.payload.roleId;
      })
      .addMatcher(api.endpoints.facebookAuthCallback.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.currentHouseholdId = action.payload.currentHouseholdId;
        state.role = action.payload.roleId;
      });
  },
});

export const { setAuthState, clearAuthState, updateUserState } = authSlice.actions;
export default authSlice.reducer;