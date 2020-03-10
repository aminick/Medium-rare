import {
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAILURE
} from "../constants/actionTypes";
import { CALL_API } from "../middleware/api";
import Schemas from "../schemas";

export const fetchArticlesAll = () => ({
  [CALL_API]: {
    types: [ARTICLES_REQUEST, ARTICLES_SUCCESS, ARTICLES_FAILURE],
    endpoint: "/articles?limie=10",
    schema: Schemas.ARTICLES_ARRAY
  }
});

// TODO: Check for local cache
// fetch or load from cache
// this is a thunk in order to dispath and getState
// getState = getStore
export const loadArticlesAll = () => (dispatch, getState) => {
  dispatch(fetchArticlesAll());
};
