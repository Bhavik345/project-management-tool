import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
