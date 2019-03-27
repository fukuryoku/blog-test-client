import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./articles";
import articles from "./articles";



const rootReducer = combineReducers({
  currentUser,
  errors,
  articles
});

export default rootReducer;
