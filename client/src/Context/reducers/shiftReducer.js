import {
  NEW_SHIFT,
  DELETE_SHIFT,
  UPDATE_SHIFT,
  SET_SHIFTS,
  REMOVE_SHIFTS,
} from "../actionTypes/actionTypes";

const initialState = {
  shifts: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHIFTS:
      return { ...state, shifts: action.employeeShifts };
    case NEW_SHIFT:
      return { ...state, shifts: [...state.shifts, action.employeeShifts] };
    case DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter(
          (shift) => shift._id !== action.employeeShifts._id
        ),
      };
    case UPDATE_SHIFT:
      return {
        ...state,
        shifts: state?.shifts?.map((shift) =>
          shift._id === action.data._id ? action.data : shift
        ),
      };
    case REMOVE_SHIFTS:
      return { ...state, shift: [] };
    default:
      return state;
  }
};
export default userReducer;
