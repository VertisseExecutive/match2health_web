import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  email: string;
  username?: string;
  role?: string;
  is_verified?: boolean;
  verification_status?: string;
  organizationName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Retrieve saved token if in browser
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("m2h_access_token") || null;
  }
  return null;
};

const getInitialUser = (): User | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("m2h_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: getInitialToken(),
  refreshToken: null,
  isAuthenticated: !!getInitialToken(),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        access: string;
        refresh?: string;
      }>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh || null;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.setItem("m2h_access_token", action.payload.access);
        localStorage.setItem("m2h_user", JSON.stringify(action.payload.user));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("m2h_access_token");
        localStorage.removeItem("m2h_user");
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
