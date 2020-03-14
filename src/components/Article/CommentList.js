import React from "react";
import Comment from "./Comment";

const CommentList = props => {
  const { items } = props;
  return items.map(([comment, author]) => {
    return <Comment {...comment} author={author} />;
  });
};

export default CommentList;
