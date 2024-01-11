import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./src/modules/auth/auth-slice";
import projectReducer from "./src/modules/projects/project-slice";
import employeeReducer from "./src/modules/employee/employee-slice";
import dashboardReducer from "./src/modules/dashboard/dashboard-slice";
import resourceReducer from "./src/modules/resource/resource-slice"
import reportReducer from "./src/modules/report/report-Slice";

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  employee: employeeReducer,
  dashboard: dashboardReducer,
  resource: resourceReducer,
  reports: reportReducer
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
