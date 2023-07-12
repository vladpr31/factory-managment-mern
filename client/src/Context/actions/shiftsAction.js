import * as API from "../../api/axios";
import {
  NEW_SHIFT,
  DELETE_SHIFT,
  UPDATE_SHIFT,
} from "../actionTypes/actionTypes";
import { tokenExpired } from "./userAction";
export const createNewShift = (newShift, location) => async (dispatch) => {
  const response = await API.createNewShift(newShift);
  if (response == "jwt expired") {
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    dispatch({ type: NEW_SHIFT, data });
  }
};
export const getShiftDataByID = (shiftID, location) => async (dispatch) => {
  console.log(shiftID);
  const response = await API.getShiftDataByID(shiftID);
  if (response == "jwt expired") {
    await tokenExpired(location, dispatch);
  } else {
    const data = response.data;
    dispatch({ type: UPDATE_SHIFT, data });
  }
};

export const updateShift =
  (shiftID, updatedShift, location) => async (dispatch) => {
    const response = await API.updateShift(shiftID, updatedShift);
    if (response == "jwt expired") {
      await tokenExpired(location, dispatch);
    } else {
      const data = response.data;
      dispatch({ type: UPDATE_SHIFT, data });
    }
  };

export const getShiftByDate = (date, location) => async (dispatch) => {
  const response = await API.getShiftDataByDate(date);
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
