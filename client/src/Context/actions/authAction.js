import { LOGIN, LOGOUT } from "../actionTypes/actionTypes";
import * as API from "../../api/axios";

export const signIn = (formInputs, location, next) => async (dispatch) => {
  try {
    console.log("in sign in function");
    const { data } = await API.signIn(formInputs);
    console.log("from signIn in authAction:", data);
    dispatch({ type: LOGIN, data });
    location(`/user/${data.id}`);
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const signOut = (location) => (dispatch) => {
  dispatch({ type: LOGOUT });
  location("/", { replace: true });
};
