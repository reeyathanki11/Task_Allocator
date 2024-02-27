import { combineReducers } from "redux";
// reducer imports
import authDataReducer from "./AuthReducer";
import classListReducer from "./ClassReducer";
const reducers = combineReducers({
  authDataReducer, classListReducer
});

export default reducers;
