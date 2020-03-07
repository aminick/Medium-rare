import { combineReducers } from "redux";
import articlesReducer from "./articles";
import commonReducer from "./common";

const rootReducer = combineReducers({
  commonState: commonReducer,
  articlesState: articlesReducer
});

export default rootReducer;
