import { createStore, compose, applyMiddleware  } from "redux";
import rootReducers from "./reducers";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

let middleware:any = [ReduxThunk];
if (process.env.REACT_APP_ENVIRONTMENT !== "production") {
  middleware = [...middleware, logger];
}

const appMiddleware = applyMiddleware(...middleware);
const store = createStore(rootReducers, composeWithDevTools(appMiddleware));

export default store;
