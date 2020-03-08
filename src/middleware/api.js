/**
 * This middleware handles api actions.
 * It will callApi using the given endpoint and schema.
 * It will dispatch the correct action type based on callApi's promise
 *
 * The api middleware is an "abstract" or "composed" middleware, meaning it will work on differnt
 * kinds of API actions as long as they have the correct format. It does not really know what kind
 * of api fetch is coming in.
 *
 * An api action is defined as:
 * {
 *   some payload...,
 *   [CALL_API]: {  <--- api action signature
 *     types, <--- an api fetch would always have 3 types, request, success, failure
 *     endpoint, <--- the end point to be fetched
 *     schema <--- the schema to normalize the data
 *   }
 * }
 */

import callApi from "../api";

export const CALL_API = "Call_API";

const api = store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { types, endpoint, schema } = callAPI;

  if (typeof endpoint != "string") {
    throw new Error("Expect end point to be a string"); // Error will be caught by JavaScript
  }

  if (!schema) {
    throw new Error("Expect a schema");
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expect types to be an array of 3 action types");
  }

  if (!types.every(type => typeof type === "string")) {
    throw new Error("Endpoind action types to be strings");
  }

  // deconstruct api actions to regular actions
  // and add new data
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema).then(
    response =>
      next(
        actionWith({
          type: successType,
          response
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || "Something went wrong...."
        })
      )
  );
};

export default api;
