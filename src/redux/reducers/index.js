import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  productReducer,
  authors,
  apiCallsInProgress
});

export default rootReducer;
