import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/authReducer";
import UserReducer from "./reducers/userReducer";
import ShiftReducer from "./reducers/shiftReducer";
export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  shifts: ShiftReducer,
});
