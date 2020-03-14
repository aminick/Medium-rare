import { normalize } from "normalizr";
import { merge } from "lodash";
const API_ROOT = "https://conduit.productionready.io/api";

// TODO: Change input config
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
  config = (token && merge(config, tokenHeader)) || {};
  return fetch(`${API_ROOT}${endpoint}`, config).then(response => {
    return response.json().then(json => {
      if (!response.ok) return Promise.reject(json);
      return normalize(json, schema);
    });
  });
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
