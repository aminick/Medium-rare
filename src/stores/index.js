import { createStore, applyMiddleware, compose } from "redux";
import { promiseMiddleware } from "../middleware";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import api from "../middleware/api";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk, api))
);

export default store;
