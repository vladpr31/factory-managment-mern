import { LOGIN, LOGOUT, REFRESH_SESSION } from "../actionTypes/actionTypes";

const initialState = {
  auth: JSON.parse(localStorage.getItem("profile")) || null,
};
/**
 *
 * @param {*} state current state
 * @param {*} action data from dispatch function
 * @returns new state with auth, saves user access Token and Refresh Token as well as id in localStorage.
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, auth: action.data };
    case LOGOUT:
      localStorage.removeItem("profile");

      return { ...state, auth: null };

    case REFRESH_SESSION:
      if (action?.data?.access_token) {
        localStorage.removeItem("profile");
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return { ...state, auth: action.data };
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
};
export default authReducer;
