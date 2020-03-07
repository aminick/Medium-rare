import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ADD_ARTICLES
} from "../constants/actionTypes";

import Articles from "../api/articles";
import { getArticlesFromRes } from "../selectors";

export const doFetchArticlesAll = () => dispatch => {
  dispatch(doFetchStart());
  Articles.fetchAll().then(
    res => {
      dispatch(doAddArticles(getArticlesFromRes(res)));
      dispatch(doFetchSuccess());
    },
    error => dispatch(doFetchError(error))
  );
};

export const doFetchStart = () => ({
  type: FETCH_START
});

export const doFetchSuccess = () => ({
  type: FETCH_SUCCESS
});

export const doFetchError = error => ({
  type: FETCH_ERROR,
  error
});

export const doAddArticles = articles => ({
  type: ADD_ARTICLES,
  articles
});
