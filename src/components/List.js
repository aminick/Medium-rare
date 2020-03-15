/**
 * A composable List component dedicated to redner a list of items
 * It takes a list of items, and a render prop
 * The list component will manage its own isFetching from the props
 */

import React from "react";

const List = props => {
  const { items, renderItem } = props;

  if (items.length === 0) {
    return <div className="article-preview">No articles are here...</div>;
  }

  return <div>{items.map(renderItem)}</div>;
};

export default List;
