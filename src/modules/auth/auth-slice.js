import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../../utils/toast-util";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export const LoginAPI = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true));
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/login`,
      data
    );
    if (response.status === 201) {
      SuccessToast(response.data.message);
      dispatch(login(data));
    } else {
      ErrorToast(response.data.message);
    }
  } catch (error) {
    ErrorToast(error?.message);
  } finally {
    dispatch(toggleLoading(false));
  }
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
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
