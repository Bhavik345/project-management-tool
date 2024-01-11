import { createSlice } from "@reduxjs/toolkit"
import authApi from "../../utils/api"
import { ErrorToast, SuccessToast } from "../../utils/toast-util";


const initialState = {
    reportData:[],
    loading: false,
    error:null
}

export const getReports = (id) => async(dispatch) => {
    try{
        const response = await authApi.get(`report/${id}`);
            if(response.status == 201){
                SuccessToast(response.data.message);
                dispatch(setReport(response?.data?.data));
            }
    }catch (error) {
        ErrorToast(error?.response?.data?.message);
        dispatch(setError(error?.message));
      }
}


export const reportSlice = createSlice({
    initialState: initialState,
    name: "report",
    reducers: {
      setReport: (state, action) => {
        state.reportData = action.payload;
      },
      toggleLoading: (state, action) => {
        state.loading = action.payload.loading;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
  });

  export const {
    setReport,
    toggleLoading,
    setError,
  } = reportSlice.actions;
  
  export default reportSlice.reducer;
  