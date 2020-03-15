import { union } from "lodash";
const defaultState = {
  isFetching: false,
  nextPageUrl: undefined,
  slugs: [],
  articlesCount: 0,
  offset: 0
};

const paginate = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expect types to be an array of 3 elements.");
  }

  if (!types.every(type => typeof type === "string")) {
    throw new Error("Ecpect types to be strings.");
  }

  if (typeof mapActionToKey !== "function") {
    throw new Error("Expected mapActionToKey to be a function.");
  }

  const [requestType, successType, failureType] = types;

  const updatePagination = (state = defaultState, action) => {
    switch (action.type) {
      case requestType: {
        return {
          ...state,
          isFetching: true
        };
      }
      case successType: {
        return {
          ...state,
          isFetching: false,
          slugs: union(state.slugs, action.response.result.articles),
          offset: action.offset,
          articlesCount: action.response.result.articlesCount
        };
      }
      case failureType: {
        return {
          ...state,
          isFetching: false
        };
      }
      default:
        return state;
    }
  };
  return (state = {}, action) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        if (typeof key !== "string") {
          throw new Error("Expected key to be a string");
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        };
      default:
        return state;
    }
  };
};
export default paginate;
