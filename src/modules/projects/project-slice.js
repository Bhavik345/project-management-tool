import { createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../utils/toast-util";
import authApi from "../../utils/api";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  loadprojectdata: {},
  abortController: null,
  projecttab: {},
};

const controller = new AbortController();
// get all projects
export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.get(`project`, {
      signal: controller.signal,
    });
    if (response.status === 200) {
      dispatch(setProjects(response.data?.data));
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

// abort the request if needed
export const abortGetAllProjects = () => (dispatch, getState) => {
  // Access the controller from the Redux state and abort the request
  const controller = getState()?.project?.abortController;
  if (controller) {
    controller.abort();
  }
};

// create a new project
export const AddProject = (data) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.post(`project`, data);
    if (response.status === 201) {
      dispatch(getAllProjects());
      SuccessToast(response.data?.message);
      // dispatch(setProjects(data));
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

// update existing project
export const UpdateProject = (data, projectId) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.patch(`project/${projectId}`, data);
    if (response.status === 200) {
      SuccessToast(response.data?.message);
      dispatch(getAllProjects());
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

// delete existing project
export const DeleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.delete(`project/${projectId}`);
    if (response.status === 200) {
      SuccessToast(response?.data?.message);
      dispatch(getAllProjects());
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

// load single project
export const LoadSingleProject = (projectId) => async (dispatch) => {
  try {
    dispatch(
      toggleLoading({
        loading: true,
        abortController: controller,
      })
    );
    const response = await authApi.get(`project/${projectId}`);
    if (response.status === 200) {
      dispatch(setLoadProjectData(response.data?.data));

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
      state.loading = action.payload.loading;
      state.abortController = action.payload.abortController;
    },
    setLoadProjectData: (state, action) => {
      state.loadprojectdata = action.payload;
    },
    setProjectTab: (state, action) => {
      state.projecttab = action.payload;
    },
  },
});

export const {
  setError,
  setProjects,
  toggleLoading,
  setLoadProjectData,
  setProjectTab,
} = projectSlice.actions;

export default projectSlice.reducer;
