import { createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../utils/toast-util";
import authApi from "../../utils/api";

const controller = new AbortController();
const initialState = {
  employees: [],
  loading: false,
  loademployeedetails: {},
  error: null,
  abortController: null,
};

// get all employees
export const getAllEmployees = () => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.get(`employee`, {
      signal: controller.signal,
    });
    if (response.status === 200) {
      dispatch(setEmployees(response.data?.data));
    }
  } catch (error) {
    ErrorToast(error?.message);

    dispatch(setError(error?.message));
  } finally {
    dispatch(
      toggleLoading({
        loading: false,
        abortController: null,
      })
    );
  }
};
// abort req if needed
export const abortGetAllEmployees = () => (dispatch, getState) => {
  // Access the controller from the Redux state and abort the request
  const controller = getState()?.employee?.abortController;
  if (controller) {
    controller.abort();
  }
};
// create a new employee
export const AddNewEmployee = (data) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.post(`employee`, data);
    if (response.status === 201) {
      SuccessToast(response.data?.message);
      dispatch(getAllEmployees());
    }
  } catch (error) {
    ErrorToast(error?.response?.data?.message);
    dispatch(setError(error?.message));
  } finally {
    dispatch(
      toggleLoading({
        loading: false,
        abortController: controller,
      })
    );
  }
};

// update existing employee
export const UpdateEmployee = (data, employeeID) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.patch(
      `${import.meta.env.VITE_REACT_API_KEY}employee/${employeeID}`,
      data
    );
    if (response.status === 200) {
      dispatch(getAllEmployees());
      SuccessToast(response.data.message);

      // dispatch(setProjects(data));
    }
  } catch (error) {
    ErrorToast(error?.response?.data?.message);
    dispatch(setError(error?.message));
  } finally {
    dispatch(
      toggleLoading({
        loading: false,
        abortController: controller,
      })
    );
  }
};

// delete existing employee
export const DeleteEmployee = (employeeID) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.delete(`employee/${employeeID}`);
    if (response.status === 200) {
      SuccessToast(response.data.message);
      dispatch(getAllEmployees());
    }
  } catch (error) {
    ErrorToast(error?.response?.data?.message);
    dispatch(setError(error?.message));
  } finally {
    dispatch(
      toggleLoading({
        loading: false,
        abortController: controller,
      })
    );
  }
};

// load employee details
export const LoadSingleEmployee = (employeeID) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.get(`employee/${employeeID}`);
    if (response.status === 200) {
      dispatch(setLoadEmployeeDetails(response?.data?.data));

      // dispatch(setProjects(data));
    }
  } catch (error) {
    ErrorToast(error?.response?.data?.message);
    dispatch(setError(error?.message));
  } finally {
    dispatch(
      toggleLoading({
        loading: false,
        abortController: controller,
      })
    );
  }
};
export const employeeSlice = createSlice({
  initialState: initialState,
  name: "employee",
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload.loading;
      state.abortController = action.payload.abortController;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoadEmployeeDetails: (state, action) => {
      state.loademployeedetails = action.payload;
    },
  },
});

export const { setEmployees, toggleLoading, setError, setLoadEmployeeDetails } =
  employeeSlice.actions;

export default employeeSlice.reducer;
