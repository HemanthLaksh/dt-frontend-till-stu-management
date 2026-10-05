import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AdminUser, AuthState } from "../types/auth.types";

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
  otpPending: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setOtpPending: (
      state,
      action: PayloadAction<AdminUser>,
    ) => {
      state.admin = action.payload;
      state.otpPending = true;
      state.isAuthenticated = false;
    },

    setAuthenticated: (
      state,
      action: PayloadAction<AdminUser>,
    ) => {
      state.admin = action.payload;
      state.otpPending = false;
      state.isAuthenticated = true;
    },

    hydrateAuth(state, action: PayloadAction<AuthState>) {
      state.admin = action.payload.admin;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.otpPending = action.payload.otpPending;
    },

    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.otpPending = false;
    },
  },
});

export const {
  setOtpPending,
  setAuthenticated,
  hydrateAuth,
  logout,
} = authSlice.actions;

export default authSlice.reducer;