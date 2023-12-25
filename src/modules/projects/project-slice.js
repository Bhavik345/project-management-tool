import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorToast } from "../../utils/toast-util";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  loadprojectdata: {},
};

export const getAllProjects = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true));
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/login`,
      data
    );
    if (response.status === 200) {
      dispatch(setProjects(data));
    }
  } catch (error) {
    ErrorToast(error?.message);
    dispatch(setError(error?.message));
  } finally {
    dispatch(toggleLoading(false));
  }
};

export const projectSlice = createSlice({
  initialState: initialState,
  name: "projects",
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadProjectData: (state, action) => {
      state.loadprojectdata = action.payload;
    },
  },
});

export const { setError, setProjects, toggleLoading, setLoadProjectData } =
  projectSlice.actions;

export default projectSlice.reducer;
