import {SET_EMP, SET_DETAIL_EMP} from '../actions'

const initialState = {
  list: [],
  current: null,
}

const EmployeeReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case SET_EMP:
      return {
        ...state,
        list: payload,
      }

    case SET_DETAIL_EMP:
      return {
        ...state,
        current: payload,
      }

    default:
      return state
  }
}

export default EmployeeReducer
