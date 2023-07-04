import {
  SET_USER,
  START_LOADING,
  END_LOADING,
  REFRESH_SESSION,
  LOGOUT,
  FETCH_ALL,
  NEW_SHIFT,
  DELETE_SHIFT,
} from "../actionTypes/actionTypes";
import * as API from "../../api/axios";

export const getUser = (id, location) => async (dispatch) => {
  const response = await API.getUserProfile(id);
  if (response == "jwt expired") {
    console.log("getUser jwt expired");
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    dispatch({ type: SET_USER, data });
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

export const createNewShift = (id, newShift, location) => async (dispatch) => {
  const response = await API.createNewShift(id, newShift);
  if (response == "jwt expired") {
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    dispatch({ type: NEW_SHIFT, data });
  }
};

export const deleteShift = (shiftID, location) => async (dispatch) => {
  const response = await API.deleteShift(shiftID);
  if (response == "jwt expired") {
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    dispatch({ type: DELETE_SHIFT, data });
  }
};

const tokenExpired = async (location, dispatch) => {
  console.log("in token expired function");
  const tokens = JSON.parse(localStorage.getItem("profile"));
  const { data } = await API.refreshSession(tokens);
  if (data !== "Need To Login Again") {
    console.log("nope went to the if");
    dispatch({ type: REFRESH_SESSION, data });
    endLoadingData();
    location(`/user/${data.id}`);
  } else {
    dispatch({ type: LOGOUT });
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
