import { SET_ATT } from "../actions";


const initialState = {
  att: []
};

const AttendanceReducer = (state = initialState, { type, payload }:any) => {
  switch (type) {
    case SET_ATT:
      return {
        ...state,
        att: payload,
      };

    default:
      return state;
  }
};

export default AttendanceReducer;