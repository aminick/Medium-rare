import * as actionTypes from "../constants/actionTypes";
import { CALL_API } from "../middleware/api";
import Schemas from "../schemas";
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
