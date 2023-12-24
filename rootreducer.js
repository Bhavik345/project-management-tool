import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./src/modules/auth/auth-slice";
import projectReducer from "./src/modules/projects/project-slice";
import employeeReducer from "./src/modules/employee/employee-slice";

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  employee: employeeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
