import * as actionTypes from "../constants/actionTypes";
import { CALL_API } from "../middleware/api";
import Schemas from "../schemas";

export const fetchArticlesAll = () => ({
  [CALL_API]: {
    types: [
      actionTypes.ARTICLES_REQUEST,
      actionTypes.ARTICLES_SUCCESS,
      actionTypes.ARTICLES_FAILURE
    ],
    endpoint: "/articles?limie=10",
    schema: { articles: Schemas.ARTICLES_ARRAY }
  }
});

// TODO: Check for local cache
// fetch or load from cache
// this is a thunk in order to dispath and getState
// getState = getStore
export const loadArticlesAll = () => (dispatch, getState) => {
  return dispatch(fetchArticlesAll());
};

const fetchUpdateSettings = settings => ({
  [CALL_API]: {
    types: [
      actionTypes.SETTINGS_REQUEST,
      actionTypes.SETTINGS_SUCCESS,
      actionTypes.SETTINGS_FAILURE
    ],
    endpoint: "/user",
    config: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(settings)
    },
    schema: { user: Schemas.USER }
  }
});

export const updateSettings = settings => dispatch => {
  return dispatch(fetchUpdateSettings(settings));
};

const fetchArticle = slug => ({
  [CALL_API]: {
    types: [
      actionTypes.ARTICLE_REQUEST,
      actionTypes.ARTICLE_SUCCESS,
      actionTypes.ARTICLES_FAILURE
    ],
    endpoint: `/articles/${slug}`,
    schema: { article: Schemas.ARTICLE }
  }
});

export const loadArticle = slug => (dispatch, getState) => {
  return dispatch(fetchArticle(slug));
};

export const fetchComments = slug => ({
  [CALL_API]: {
    types: [
      actionTypes.COMMENTS_REQUEST,
      actionTypes.COMMENTS_SUCCESS,
      actionTypes.COMMENTS_FAILURE
    ],
    endpoint: `/articles/${slug}/comments`,
    schema: { comments: Schemas.COMMENTS_ARRAY }
  }
});

export const loadComments = slug => dispatch => {
  return dispatch(fetchComments(slug));
};

export const addComment = (slug, comment) => ({
  [CALL_API]: {
    types: [
      actionTypes.COMMENT_ADD_REQUEST,
      actionTypes.COMMENT_ADD_SUCCESS,
      actionTypes.COMMENT_ADD_FAILURE
    ],
    endpoint: `/articles/${slug}/comments`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(comment)
    },
    schema: { comment: Schemas.COMMENT }
  }
});

export const deleteComment = (slug, id) => ({
  id,
  [CALL_API]: {
    types: [
      actionTypes.COMMENT_DELETE_REQUEST,
      actionTypes.COMMENT_DELETE_SUCCESS,
      actionTypes.COMMENT_DELETE_FAILURE
    ],
    endpoint: `/articles/${slug}/comments/${id}`,
    config: {
      method: "DELETE"
    },
    schema: {}
  }
});
