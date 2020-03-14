import React from "react";
import Comment from "./Comment";

const CommentList = props => {
  const { items, currentUser, slug } = props;
  return items.map(([comment, author]) => {
    const item = { ...comment, author: { ...author } };
    return (
      <Comment
        {...item}
        key={comment.id}
        currentUser={currentUser}
        slug={slug}
      />
    );
  });
};

export default CommentList;
