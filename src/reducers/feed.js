/**
 * This is a higer order reducer that creates reducers based on they given
 * action types and a "key" which it's going to update. This is used
 * for local cache reasons such that we can cache different users data such as articles
 */

const defaultFeedsState = {
  isFetching: false,
  articles: [],
  error: null,
  articlesCount: [],
  nextPageUrl: ""
};

export const feed = ({ types }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expect types to be an array of 3 elements");
  }

  if (!types.every(type => typeof type === "string")) {
    throw new Error("Ecpect types to be strings");
  }

  const [requestType, successType, failureType] = types;
  return (state = defaultFeedsState, action) => {
    switch (action.type) {
      case requestType: {
        return { ...state, isFetching: true };
      }
      case successType: {
        return {
          ...state,
          isFetching: false,
          articles: action.response.result.articles
        };
      }
      case failureType: {
        return { ...state, isFetching: false };
      }
      default:
        return state;
    }
  };
};
