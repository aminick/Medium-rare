import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../constants/actionTypes";

const defaultAuthState = {
  isAuthenticated: false,
  isFetching: false,
  user: null
};

const auth = (state = defaultAuthState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isFetching: true, isAuthenticated: false, user: null };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.response.result
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default auth;
