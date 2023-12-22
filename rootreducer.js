import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./src/modules/auth/auth-slice";
import projectReducer from "./src/modules/projects/project-slice";
import employeeRducer from "./src/modules/employee/employee-slice";
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  employee: employeeRducer,
});



export default rootReducer;
