import { combineReducers } from "redux";
import articlesReducer from "./articles";
import commonReducer from "./common";
import merge from "lodash/merge";
import feed from "./feed";
import {
  ARTICLES_REQUEST,
  ARTICLES_SUCESS,
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

const personalFeed = feed({
  types: [ARTICLES_REQUEST, ARTICLES_SUCESS, ARTICLES_FAILURE]
});

const feeds = combineReducers({
  personalFeed
});

const rootReducer = combineReducers({
  common: commonReducer,
  entities: entitiesReducer,
  feeds: feeds
});

export default rootReducer;
