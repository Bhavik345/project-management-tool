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
      `${import.meta.env.VITE_REACT_API_KEY}auth/login`,
      data
    );
    if (response.status === 200) {
      localStorage.setItem('token',response?.data?.data?.token);
      dispatch(login(response?.data?.data));

      SuccessToast(response.data.message);
    } else {
      ErrorToast(response.data.message);
    }
  } catch (error) {
    ErrorToast(error?.response?.data?.message);
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
