import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./src/modules/auth/auth-slice";
import projectReducer from "./src/modules/projects/project-slice";
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;
