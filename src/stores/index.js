import { createStore, applyMiddleware, compose } from "redux";
import { promiseMiddleware } from "../middleware";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk))
);

export default store;
