import {
  ARTICLE_SUCCESS,
  COMMENTS_SUCCESS,
  COMMENT_ADD_SUCCESS,
  COMMENT_DELETE_SUCCESS,
  ARTICLE_PAGE_UNLOAD
} from "../constants/actionTypes";

const article = (state = {}, action) => {
  const { response } = action;
  switch (action.type) {
    case ARTICLE_SUCCESS: {
      return {
        ...state,
        article: response.result.article
      };
    }
    case COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: response.result.comments
      };
    }
    case COMMENT_ADD_SUCCESS: {
      return {
        ...state,
        comments: [...state.comments, response.result.comment]
      };
    }
    case COMMENT_DELETE_SUCCESS: {
      const { id } = action;
      return {
        ...state,
        comments: state.comments.filter(comment => comment !== id)
      };
    }
    case ARTICLE_PAGE_UNLOAD: {
      return {};
    }
    default:
      return state;
  }
};

export default article;
