import { createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../utils/toast-util";
import authApi from "../../utils/api";
import { getAllProjects } from "../projects/project-slice";

const initialState = {
  resources: [],
  loading: false,
  error: null,
  loadresourcedata: {},
  abortController: null,
  isprojectupdate: false,
  resourceStatus:[]
};
const controller = new AbortController();

export const getAllResources = () => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.get(`resource`, {
      signal: controller.signal,
    });
    if (response.status === 200) {
      dispatch(setResources(response.data?.data));
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

export const getResourceStatus = () => async (dispatch) => {
  try {
    
    const response = await authApi.get(`resource/status`, {
      signal: controller.signal,
    });
    if (response.status === 200) {
      dispatch(setResourcesStatus(response.data?.data));
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

export const AddResource = (data) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.post(`resource/assign`, data);
    if (response.status === 201) {
      dispatch(getAllResources());
      dispatch(getAllProjects());
      dispatch(setIsProjectUpdate(true));

      SuccessToast(response.data?.message);
      return response;
      // dispatch(setResources(data));
    } else {
      ErrorToast(response.data.message);
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

export const UpdateResource = (data, resourceId) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.patch(`resource/${resourceId}`, data);
    if (response.status === 200) {
      SuccessToast(response.data?.message);
      dispatch(getAllResources());
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


export const DeleteResourceEmployee = (payload) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.delete(`resource/${payload.id}`);
    if (response.status === 200) {
      SuccessToast(response.data.message);
      dispatch(getAllProjects());
      dispatch(setIsProjectUpdate(true));
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

export const ResourceSlice = createSlice({
  initialState: initialState,
  name: "Resources",
  reducers: {
    setResources: (state, action) => {
      state.resources = action.payload;
    },
    setResourcesStatus: (state, action) => {
      state.resourceStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload.loading;
      state.abortController = action.payload.abortController;
    },
    setLoadResourceData: (state, action) => {
      state.loadresourcedata = action.payload;
    },
    setIsProjectUpdate: (state, action) => {
      state.isprojectupdate = action.payload;
    },
  },
});

export const {
  setError,
  setResources,
  setResourcesStatus,
  toggleLoading,
  setLoadResourceData,
  setIsProjectUpdate,
} = ResourceSlice.actions;

export default ResourceSlice.reducer;
