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
    schema: Schemas.ARTICLE
  }
});

export const loadArticle = slug => (dispatch, getState) => {
  const article = getState().entities.articles[slug];
  if (article) return null;
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
    schema: Schemas.COMMENTS_ARRAY
  }
});

export const loadComments = slug => dispatch => {
  return dispatch(fetchComments(slug));
};
