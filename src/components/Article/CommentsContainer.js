import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadComments } from "../../actions/api";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { zip } from "lodash";

const CommentsContainer = props => {
  const { comments, users, currentUser, slug } = props;
  return (
    <section className="section">
      <div className="columns is-centered is-tablet">
        <div className="column is-two-thirds">
          {!comments ? null : (
            <CommentList
              slug={slug}
              items={zip(comments, users)}
              currentUser={currentUser}
            />
          )}
          {!currentUser ? (
            <div>
              Please <Link to="/login">login</Link> or{" "}
              <Link to="/register">Sign up</Link> to leave a comment.
            </div>
          ) : (
            <CommentInput slug={slug} currentUser={currentUser} />
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ entities, auth, article }) => {
  const comments =
    (article.comments &&
      article.comments
        .map(id => entities.comments[id])
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))) ||
    null;
  const users =
    (comments && comments.map(comment => entities.users[comment.author])) ||
    null;
  const currentUser =
    (auth.isAuthenticated && entities.users[auth.user]) || null;
  return {
    comments,
    users,
    currentUser
  };
};

const mapDispatchToProps = {
  loadComments
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
