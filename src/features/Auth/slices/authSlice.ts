import { createSlice } from "@reduxjs/toolkit";
import isTokenValid from "../../../helpers/isTokenValid.ts";

interface User {
  id: string | null;
  name?: string | null;
  lastName?: string | null;
  email: string | null;
  roles?: any[] | null;
}

interface AuthState {
  isAuthenticated?: boolean;
  user: User | null;
  token: string | null;
  loading?: boolean;
  error: string | null;
}

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("access_token");
};

const initialState: AuthState = {
  isAuthenticated: (() => {
    const token = getTokenFromLocalStorage();
    return token ? isTokenValid(token) : false;
  })(),
  user:
    {
      id: localStorage.getItem("userId") || null,
      name: localStorage.getItem("UserName") || null,
      lastName: localStorage.getItem("UserLastName") || null,
      email: localStorage.getItem("email") || null,
      roles: [localStorage.getItem("roles")] || null,
    } || null,
  token: localStorage.getItem("access_token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReduces: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
    },
  },
});

export const { loginReduces, logout } = authSlice.actions;
export default authSlice.reducer;
