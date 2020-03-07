const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    action.payload
      .then(
        res => Object.assign({}, action, { payload: res }),
        error =>
          Object.assign({}, action, {
            error: true,
            payload: error.response.body
          })
      )
      .then(action => store.dispatch(action));
    return;
  }
  next(action);
};

const isPromise = v => v && typeof v.then === "function";

export { promiseMiddleware };
