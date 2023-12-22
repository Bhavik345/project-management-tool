import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  // isopen: false,
  // modalMode: "add",
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
    // setIsOpen: (state, action) => {
    //   state.isopen = action.payload;
    // },
    // setIsClosed: (state, action) => {
    //   state.isopen = action.payload;
    // },
    // setModalMode: (state, action) => {
    //   state.modalMode = action.payload;
    // },
  },
});

export const { login, logout } =
  authSlice.actions;

export default authSlice.reducer;
