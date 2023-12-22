import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeSlice = createSlice({
  initialState: initialState,
  name: "employee",
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    toggleLoadings: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
    setEmployees,
    toggleLoadings,
    setError
 } = employeeSlice.actions;

export default employeeSlice.reducer;
