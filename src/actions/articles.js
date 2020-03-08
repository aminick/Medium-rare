import {
  ARTICLES_REQUEST,
  ARTICLES_SUCESS,
  ARTICLES_FAILURE
} from "../constants/actionTypes";
import { CALL_API } from "../middleware/api";
import Schemas from "../schemas";

export const fetchArticlesAll = () => ({
  [CALL_API]: {
    types: [ARTICLES_REQUEST, ARTICLES_SUCESS, ARTICLES_FAILURE],
    endpoint: "/articles?limie=10",
    schema: Schemas.ARTICLES_ARRAY
  }
});

// fetch or load from cache
// this is a thunk in order to dispath and getState
export const loadArticlesAll = () => (dispatch, getState) => {
  dispatch(fetchArticlesAll());
};
