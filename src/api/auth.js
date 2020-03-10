import Schemas from "../schemas";
import { normalize } from "normalizr";
const API_ROOT = "https://conduit.productionready.io/api";

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

const Auth = {
  loginUser: creds => loginUser(creds)
};

export default Auth;
