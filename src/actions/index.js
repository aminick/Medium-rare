import * as actionTypes from "../constants/actionTypes";
import { CALL_API } from "../middleware/api";
import Schemas from "../schemas";

export const resetErrorMessage = () => ({
  type: actionTypes.RESET_ERROR_MESSAGE
});

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
