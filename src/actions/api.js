import * as actionTypes from "../constants/actionTypes";
import { CALL_API } from "../middleware/api";
import Schemas from "../schemas";

export const createArticle = article => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_ARTICLE_REQUEST,
      actionTypes.CREATE_ARTICLE_SUCCESS,
      actionTypes.CREATE_ARTICLE_FAILURE
    ],
    endpoint: `/articles`,
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(article)
    },
    schema: { article: Schemas.ARTICLE }
  }
});

export const fetchFavoritedArticles = (username, offset) => ({
  username,
  offset,
  [CALL_API]: {
    types: [
      actionTypes.FAVORITED_ARTICLES_REQUEST,
      actionTypes.FAVORITED_ARTICLES_SUCCESS,
      actionTypes.FAVORITED_ARTICLES_FAILURE
    ],
    endpoint: `/articles?favorited=${username}&limit=10&offset=${offset}`,
    schema: { articles: Schemas.ARTICLES_ARRAY }
  }
});

export const loadFavoritedArticles = (username, nextPage = false) => (
  dispatch,
  getState
) => {
  const { offset = 0 } = getState().pagination.favorited[username] || {};
  const { slugs } = getState().pagination.favorited[username] || {};
  if (slugs && !nextPage) return null;
  return dispatch(fetchFavoritedArticles(username, offset + (nextPage && 10)));
};

export const fetchPublishedArticles = (username, offset) => ({
  username,
  offset,
  [CALL_API]: {
    types: [
      actionTypes.PUBLISHED_ARTICLES_REQUEST,
      actionTypes.PUBLISHED_ARTICLES_SUCCESS,
      actionTypes.PUBLISHED_ARTICLES_FAILURE
    ],
    endpoint: `/articles?author=${username}&limit=10&offfset=${offset}`,
    schema: { articles: Schemas.ARTICLES_ARRAY }
  }
});

export const loadPublishedArticles = (username, nextPage = false) => (
  dispatch,
  getState
) => {
  const { offset = 0 } = getState().pagination.published[username] || {};
  const { slugs } = getState().pagination.published[username] || {};
  if (slugs && !nextPage) return null;
  return dispatch(fetchPublishedArticles(username, offset + (nextPage && 10)));
};

export const fetchProfile = username => ({
  [CALL_API]: {
    types: [
      actionTypes.PROFILE_REQUEST,
      actionTypes.PROFILE_SUCCESS,
      actionTypes.PROFILE_FAILURE
    ],
    endpoint: `/profiles/${username}`,
    schema: { profile: Schemas.USER }
  }
});

export const loadProfile = username => (dispatch, getState) => {
  const user = getState().entities.users[username];
  if (user) return null;
  return dispatch(fetchProfile(username));
};

export const fetchGloablFeed = (offset = 0) => ({
  feedType: "global",
  offset: offset,
  [CALL_API]: {
    types: [
      actionTypes.FEED_REQUEST,
      actionTypes.FEED_SUCCESS,
      actionTypes.FEED_FAILURE
    ],
    endpoint: `/articles?limit=10&offset=${offset}`,
    schema: { articles: Schemas.ARTICLES_ARRAY }
  }
});

export const loadGlobalFeed = (nextPage = false) => (dispatch, getState) => {
  const { offset = 0 } = getState().pagination.feed["global"] || {};
  const { slugs } = getState().pagination.feed["global"] || {};
  if (slugs && !nextPage) return null;
  return dispatch(fetchGloablFeed(offset + (nextPage && 10)));
};

export const fetchPersonalFeed = (offset = 0) => ({
  feedType: "personal",
  offset: offset,
  [CALL_API]: {
    types: [
      actionTypes.FEED_REQUEST,
      actionTypes.FEED_SUCCESS,
      actionTypes.FEED_FAILURE
    ],
    endpoint: `/articles/feed?limit=10&offset=${offset}`,
    schema: { articles: Schemas.ARTICLES_ARRAY }
  }
});

export const loadPersonalFeed = (nextPage = false) => (dispatch, getState) => {
  const { offset = 0 } = getState().pagination.feed["personal"] || {};
  const { slugs } = getState().pagination.feed["personal"] || {};
  if (slugs && !nextPage) return null;
  return dispatch(fetchPersonalFeed(offset + (nextPage && 10)));
};

export const fetchArticlesAll = () => ({
  [CALL_API]: {
    types: [
      actionTypes.ARTICLES_REQUEST,
      actionTypes.ARTICLES_SUCCESS,
      actionTypes.ARTICLES_FAILURE
    ],
    endpoint: "/articles?limit=50",
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
