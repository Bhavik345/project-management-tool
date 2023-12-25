import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboard:[],
    loading:false,
    error:null,
};



export const dashboardSlice = createSlice({
    initialState : initialState,
    name: "dashboard",
    reducers: {
       setDashboard: (state,action) => {
        state.dashboard = action.payload;
       },
       toggleLoadings : (state,action) => {
        state.loading = action.payload
       },

       setError: (state,action) => {
        state.setError = action.payload
       } 
    }
});

export const {
    setDashboard,
    setError,
} = dashboardSlice.actions

export default dashboardSlice.reducer