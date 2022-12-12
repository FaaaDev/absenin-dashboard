import {RESET_DETAIL_SHIFT, SET_DETAIL_SHIFT, SET_SHIFT} from '../actions'

const initialState = {
  list: [],
  current: {
    id: null,
    shift_name: '',
    timezone: null,
    schedule: [
      {
        day: 1,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
      {
        day: 2,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
      {
        day: 3,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
      {
        day: 4,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
      {
        day: 5,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
      {
        day: 6,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
      {
        day: 7,
        check_in_s: null,
        check_in_e: null,
        break_out_s: null,
        break_out_e: null,
        break_in_s: null,
        break_in_e: null,
        check_out_s: null,
        check_out_e: null,
      },
    ],
  },
}

const ShiftReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case SET_SHIFT:
      return {
        ...state,
        list: payload,
      }

    case SET_DETAIL_SHIFT:
      return {
        ...state,
        current: payload,
      }

    default:
      return state
  }
}

export default ShiftReducer
