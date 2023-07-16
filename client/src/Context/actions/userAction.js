import {
  SET_USER,
  START_LOADING,
  END_LOADING,
  REFRESH_SESSION,
  LOGOUT,
  FETCH_ALL,
  SET_SHIFTS,
  REMOVE_SHIFTS,
} from "../actionTypes/actionTypes";
import * as API from "../../api/axios";

export const getUser = (id, location) => async (dispatch) => {
  const response = await API.getUserProfile(id);
  if (response == "jwt expired") {
    console.log("getUser jwt expired");
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    const employeeShifts = data?.shifts;
    dispatch({ type: SET_USER, data });
    dispatch({ type: SET_SHIFTS, employeeShifts });
  }
};

export const getAllEmployees = (location) => async (dispatch) => {
  const response = await API.getAllEmployees();
  if (response == "jwt expired") {
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    dispatch({ type: FETCH_ALL, data });
  }
};

export const updateUserInfo =
  (id, updatedInfo, location) => async (dispatch) => {
    const response = await API.updateUserInfo(id, updatedInfo);
    console.log("update user response:", response);
    if (response == "jwt expired") {
      await tokenExpired(location, dispatch);
    } else {
      const data = response.data;
      dispatch({ type: SET_USER, data });
    }
  };

export const tokenExpired = async (location, dispatch) => {
  console.log("in token expired function");
  const tokens = JSON.parse(localStorage.getItem("profile"));
  const response = await API.refreshSession(tokens);
  if (response !== "Need To Login Again") {
    const { data } = response;
    dispatch({ type: REFRESH_SESSION, data });
    endLoadingData();
    location(`/user/${data.id}`);
  } else {
    dispatch({ type: LOGOUT });
    dispatch({ type: REMOVE_SHIFTS });
    location("/login");
    alert("Session Expired");
  }
};

export const startLoadingData = () => async (dispatch) => {
  dispatch({ type: START_LOADING });
};
export const endLoadingData = () => async (dispatch) => {
  dispatch({ type: END_LOADING });
};
