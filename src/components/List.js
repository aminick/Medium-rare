/**
 * A composable List component dedicated to redner a list of items
 * It takes a list of items, and a render prop
 * The list component will manage its own isFetching from the props
 */

import React, { useState } from "react";
import Spinner from "./Spinner";

const List = props => {
  const { isFetching, items, renderItem } = props;

  if (isFetching) {
    return <Spinner />;
  }

  if (items.length === 0) {
    return <div className="article-preview">No articles are here...</div>;
  }

  return <div>{items.map(renderItem)}</div>;
};

export default List;
