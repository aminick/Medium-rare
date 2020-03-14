import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SETTINGS_SUCCESS
} from "../constants/actionTypes";

const defaultAuthState = {
  isAuthenticated: false,
  isFetching: false,
  user: null
};

const auth = (state = defaultAuthState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST: {
      return { ...state, isFetching: true, isAuthenticated: false, user: null };
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.response.result
      };
    }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.error
      };
    }
    case LOGOUT_SUCCESS: {
      return defaultAuthState;
    }
    case SETTINGS_SUCCESS: {
      return { ...state, user: action.response.result.user };
    }
    default:
      return state;
  }
};

export default auth;
