import { normalize } from "normalizr";
import { merge } from "lodash";
const API_ROOT = "https://conduit.productionready.io/api";

const checkErrors = response => {
  if (!response.ok) return Promise.reject(response.json());
  return response;
};

// TODO: Rewrite checkErrors logic <-- maybe this works as well
/**
 * Fetches API and normalize data
 * @param {string} endpoint
 * @param {schema} schema
 */
const callApi = (endpoint, schema, config = {}) => {
  const token = localStorage.getItem("id_token") || null;
  const tokenHeader = {
    headers: {
      authorization: `Token ${token}`
    }
  };
  config = merge(config, tokenHeader);
  return fetch(`${API_ROOT}${endpoint}`, config)
    .then(response => checkErrors(response))
    .then(response => response.json())
    .then(json => {
      const key = Object.keys(json)[0];
      return normalize(json[key], schema);
    }); // 🔥 maybe a selector for articles?
  /**
   * resolved json is a normalized object:
   * {
   *  entities: { <--- entities we created using schema
   *    ...
   *  },
   *  result: articles: ['slug1', 'slug2'...] <--- normalized input data
   * }
   */
};

export default callApi;
