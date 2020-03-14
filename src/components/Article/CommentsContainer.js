import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadComments } from "../../actions/api";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { zip } from "lodash";

const CommentsContainer = props => {
  const { comments, users } = props;
  return (
    <section className="section">
      <div className="columns is-centered is-tablet">
        <div className="column is-two-thirds">
          <CommentList items={zip(comments, users)} />
          <CommentInput />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ entities }, { commentsAsIds }) => {
  const comments = commentsAsIds.map(id => entities.comments[id]);
  const users = comments.map(comment => entities.users[comment.author]);
  return {
    comments,
    users
  };
};

const mapDispatchToProps = {
  loadComments
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
