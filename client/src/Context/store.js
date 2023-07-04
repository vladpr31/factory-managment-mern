import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/authReducer";
import UserReducer from "./reducers/userReducer";
export default combineReducers({ auth: AuthReducer, user: UserReducer });
