import Schemas from "../schemas";
import { normalize } from "normalizr";
const API_ROOT = "https://conduit.productionready.io/api";

/**
 * response: {
 *     entities: {
 *      ...  <--- normalized user data
 *     },
 *     result: ...  <--- the user as username
 *     token: ... <--- jwt token
 * }
 */

const loginUser = creds => {
  return fetch(`${API_ROOT}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(creds)
  }).then(response => {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const { token, ...rest } = json.user;
      const normalized = normalize(rest, Schemas.USER);
      return {
        ...normalized,
        token
      };
    });
  });
};

const getCurrentUser = token => {
  return fetch(`${API_ROOT}/user`, {
    headers: {
      authorization: `Token ${token}`
    }
  }).then(response => {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const { token, ...rest } = json.user;
      const normalized = normalize(rest, Schemas.USER);
      return {
        ...normalized,
        token
      };
    });
  });
};

const registerUser = creds => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(creds)
  }).then(response => {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const { token, ...rest } = json.user;
      const normalized = normalize(rest, Schemas.USER);
      return {
        ...normalized,
        token
      };
    });
  });
};

const Auth = {
  loginUser: creds => loginUser(creds),
  getCurrentUser: token => getCurrentUser(token),
  registerUser: creds => registerUser(creds)
};

export default Auth;
