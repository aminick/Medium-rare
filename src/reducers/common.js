import { APP_LOAD } from "../constants/actionTypes";

const defaultState = {
  appName: "Medium-rare",
  appLoaded: false
};

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD: {
      return { ...state, appLoaded: true };
    }
    default:
      return state;
  }
};

export default commonReducer;
