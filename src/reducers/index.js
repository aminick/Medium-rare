import { combineReducers } from "redux";
import commonReducer from "./common";
import merge from "lodash/merge";
import { feed as FEED } from "./feed";
import auth from "./auth";
import article from "./article";
import paginate from "./paginate";
import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAILURE,
  FEED_REQUEST,
  FEED_SUCCESS,
  FEED_FAILURE
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

const globalFeed = FEED({
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

const pagination = combineReducers({
  feed: paginate({
    types: [FEED_REQUEST, FEED_SUCCESS, FEED_FAILURE],
    mapActionToKey: action => action.feedType
  })
});

const rootReducer = combineReducers({
  common: commonReducer,
  entities: entitiesReducer,
  feeds: feeds,
  auth: auth,
  errorMessage: errorMessageReducer,
  article: article,
  pagination
});

export default rootReducer;

// const pagination = {
//   feed: {
//     personal: {
//       pageCount: 0
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       offset:
//       articlesCount: 25
//     },
//     global: {
//       pageCount: 0
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     }
//   },
//   published: {
//     user1: {
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     },
//     user2: {
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     }
//   },
//   favorited: {
//     user1: {
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     },
//     user2: {
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     }
//   },
//   tagged: {
//     tag1: {
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     },
//     tag2: {
//       isFetching: false,
//       slugs: ["slug1", "slug2"],
//       nextPageUrl: "/xxxxx"
//     }
//   }
// };
