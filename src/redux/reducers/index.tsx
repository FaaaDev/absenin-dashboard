import { combineReducers } from "redux";
import AttendanceReducer from "./AttendanceReducer";
import EmployeeReducer from "./EmployeeReducer"
import ShiftReducer from "./ShiftReducer";


const rootReducer = combineReducers({
    attendance: AttendanceReducer,
    employee: EmployeeReducer,
    shift: ShiftReducer,
  });
  
  export default rootReducer;
  