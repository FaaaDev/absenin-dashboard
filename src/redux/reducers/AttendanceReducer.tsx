import {SET_ATT, SET_DETAIL_ATT} from '../actions'

const initialState = {
  att: [],
  current: null,
}

const AttendanceReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case SET_ATT:
      return {
        ...state,
        att: payload,
      }

    case SET_DETAIL_ATT:
      return {
        ...state,
        current: payload,
      }

    default:
      return state
  }
}

export default AttendanceReducer
