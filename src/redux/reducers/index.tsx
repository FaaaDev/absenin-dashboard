import { combineReducers } from "redux";
import AttendanceReducer from "./AttendanceReducer";


const rootReducer = combineReducers({
    attendance: AttendanceReducer
  });
  
  export default rootReducer;
  