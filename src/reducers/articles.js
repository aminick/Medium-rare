// deprecated
import {
  ADD_ARTICLES,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS
} from "../constants/actionTypes";

const defaultState = {
  appName: "Medium-rare",
  articles: [],
  error: null,
  isFetching: false
};

const articlesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ARTICLES: {
      return applyAddArticles(state, action);
    }
    case FETCH_START: {
      return applyFetchStart(state, action);
    }
    case FETCH_SUCCESS: {
      return applyFetchSuccess(state, action);
    }
    case FETCH_ERROR: {
      return applyFetchError(state, action);
    }

    default:
      return state;
  }
};

const applyAddArticles = (state, action) => {
  return { ...state, articles: action.articles };
};

const applyFetchStart = (state, action) => {
  return { ...state, isFetching: true };
};

const applyFetchSuccess = (state, action) => {
  return { ...state, isFetching: false };
};

const applyFetchError = (state, action) => {
  return { ...state, isFetching: false, error: action.error };
};

export default articlesReducer;
