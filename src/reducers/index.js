import { combineReducers } from "redux";
import commonReducer from "./common";
import merge from "lodash/merge";
import { feed as FEED } from "./feed";
import auth from "./auth";
import article from "./article";
import paginate from "./paginate";
import {
  FEED_REQUEST,
  FEED_SUCCESS,
  FEED_FAILURE,
  PUBLISHED_ARTICLES_REQUEST,
  PUBLISHED_ARTICLES_SUCCESS,
  PUBLISHED_ARTICLES_FAILURE,
  FAVORITED_ARTICLES_REQUEST,
  FAVORITED_ARTICLES_SUCCESS,
  FAVORITED_ARTICLES_FAILURE,
  TAGGED_ARTICLES_REQUEST,
  TAGGED_ARTICLES_SUCCESS,
  TAGGED_ARTICLES_FAILURE
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

const errorMessageReducer = (state = null, action) => {
  const { error } = action;
  if (error) return error;
  return null;
};

const pagination = combineReducers({
  feed: paginate({
    types: [FEED_REQUEST, FEED_SUCCESS, FEED_FAILURE],
    mapActionToKey: action => action.feedType
  }),
  published: paginate({
    types: [
      PUBLISHED_ARTICLES_REQUEST,
      PUBLISHED_ARTICLES_SUCCESS,
      PUBLISHED_ARTICLES_FAILURE
    ],
    mapActionToKey: action => action.username
  }),
  favorited: paginate({
    types: [
      FAVORITED_ARTICLES_REQUEST,
      FAVORITED_ARTICLES_SUCCESS,
      FAVORITED_ARTICLES_FAILURE
    ],
    mapActionToKey: action => action.username
  }),
  tagged: paginate({
    types: [
      TAGGED_ARTICLES_REQUEST,
      TAGGED_ARTICLES_SUCCESS,
      TAGGED_ARTICLES_FAILURE
    ],
    mapActionToKey: action => action.tag
  })
});

const rootReducer = combineReducers({
  common: commonReducer,
  entities: entitiesReducer,
  auth: auth,
  errorMessage: errorMessageReducer,
  article: article,
  pagination
});

export default rootReducer;
