import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
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
      localStorage.setItem(
        "current_user",
        JSON.stringify(response.entities.users[response.result])
      );
      return Promise.resolve(dispatch(doLoginSuccess(response)));
    },
    error => {
      return Promise.reject(dispatch(doLoginFailure(error)));
    }
  );
};

export const getCurrentUser = token => dispatch => {
  dispatch(doLoginRequest());
  return Auth.getCurrentUser(token).then(
    response => {
      localStorage.setItem(
        "current_user",
        JSON.stringify(response.entities.users[response.result])
      );
      dispatch(doLoginSuccess(response));
    },
    error => {
      return dispatch(doLoginFailure(error));
    }
  );
};

export const doRegisterRequest = () => ({
  type: REGISTER_REQUEST
});

export const doRegisterSuccess = response => ({
  type: REGISTER_SUCCESS,
  response
});

export const doRegisterFailure = error => ({
  type: REGISTER_FAILURE,
  error: "Register failed"
});

export const registerUser = creds => dispatch => {
  dispatch(doRegisterRequest());
  return Auth.registerUser(creds).then(
    response => {
      localStorage.setItem("id_token", response.token);
      localStorage.setItem(
        "current_user",
        JSON.stringify(response.entities.users[response.result])
      );
      return Promise.resolve(dispatch(doRegisterSuccess(response)));
    },
    error => {
      return Promise.reject(dispatch(doRegisterFailure(error)));
    }
  );
};

export const doLogoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const doLogoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const doLogoutFailure = () => ({
  type: LOGOUT_FAILURE,
  error: "Something bad happened..."
});

export const doLogoutUser = () => dispatch => {
  dispatch(doLogoutRequest());
  try {
    localStorage.removeItem("id_token");
    localStorage.removeItem("current_user");
    dispatch(doLogoutSuccess());
  } catch (e) {
    dispatch(doLogoutFailure());
  }
};
