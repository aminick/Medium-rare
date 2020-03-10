import { normalize } from "normalizr";

const API_ROOT = "https://conduit.productionready.io/api";

const checkErrors = response => {
  if (!response.ok) return Promise.reject(response.json());
  return response;
};

// TODO: Rewrite checkErrors logic
/**
 * Fetches API and normalize data
 * @param {string} endpoint
 * @param {schema} schema
 */
const callApi = (endpoint, schema) => {
  return fetch(`${API_ROOT}${endpoint}`)
    .then(response => checkErrors(response))
    .then(response => response.json())
    .then(json => normalize(json.articles, schema)); // 🔥 maybe a selector for articles?
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
