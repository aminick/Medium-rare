import {
  RESET_ERROR_MESSAGE,
  ARTICLE_PAGE_UNLOAD
} from "../constants/actionTypes";

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
});

export const unloadArticle = () => ({
  type: ARTICLE_PAGE_UNLOAD
});
