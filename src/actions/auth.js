import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../constants/actionTypes";

import Auth from "../api/auth";

export const doLoginRequest = () => ({
  type: LOGIN_REQUEST
});

export const doLoginSuccess = response => ({
  type: LOGIN_SUCCESS,
  response
});

export const doLoginFailure = error => {
  const errorMessage =
    (error && error.errors && Object.keys(error.errors)) ||
    "Something went wrong";
  return {
    type: LOGIN_FAILURE,
    error: errorMessage
  };
};

export const loginUser = creds => dispatch => {
  dispatch(doLoginRequest());
  return Auth.loginUser(creds).then(
    response => {
      localStorage.setItem("id_token", response.token);
      dispatch(doLoginSuccess(response));
    },
    error => {
      return dispatch(doLoginFailure(error));
    }
  );
};
