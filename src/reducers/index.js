import { combineReducers } from "redux";
import commonReducer from "./common";
import merge from "lodash/merge";
import feed from "./feed";
import auth from "./auth";
import article from "./article";
import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAILURE
} from "../constants/actionTypes";

const defaultEntityState = {
  users: {},
  articles: {}
};

const entitiesReducer = (state = defaultEntityState, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
};

const globalFeed = feed({
  types: [ARTICLES_REQUEST, ARTICLES_SUCCESS, ARTICLES_FAILURE]
});

const feeds = combineReducers({
  globalFeed
});

const errorMessageReducer = (state = null, action) => {
  const { error } = action;
  if (error) return error;
  return null;
};

const rootReducer = combineReducers({
  common: commonReducer,
  entities: entitiesReducer,
  feeds: feeds,
  auth: auth,
  errorMessage: errorMessageReducer,
  article: article
});

export default rootReducer;
