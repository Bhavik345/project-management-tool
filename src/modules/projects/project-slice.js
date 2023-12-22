import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: null,
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
  },
});

export const { setError,setProjects,toggleLoading } = projectSlice.actions;

export default projectSlice.reducer;
