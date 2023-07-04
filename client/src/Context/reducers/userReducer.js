import {
  SET_USER,
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  NEW_SHIFT,
  DELETE_SHIFT,
} from "../actionTypes/actionTypes";

const initialState = {
  user: {},
  allUsers: [],
  isLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.data };
    case FETCH_ALL:
      return {
        ...state,
        allUsers: action.data,
      };
    case NEW_SHIFT:
      return {
        ...state,
        user: action.data,
      };
    case DELETE_SHIFT:
      return {
        ...state,
        user: action.data,
      };
    case START_LOADING:
      console.log("START_LOADING");
      return { ...state, isLoading: true };
    case END_LOADING:
      console.log("END_LOADING");
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
export default userReducer;
