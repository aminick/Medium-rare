import React from "react";
import { connect } from "react-redux";
import { loadComments } from "../../actions/api";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { zip, isEmpty } from "lodash";

const CommentsContainer = props => {
  const { comments, users, currentUser, slug } = props;
  return (
    <section className="section">
      <div className="columns is-centered is-tablet">
        <div className="column is-two-thirds">
          <CommentList
            slug={slug}
            items={zip(comments, users)}
            currentUser={currentUser}
          />
          {isEmpty(currentUser) ? (
            <div>Please login</div>
          ) : (
            <CommentInput slug={slug} currentUser={currentUser} />
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ entities, auth, article }) => {
  const comments = article.comments.map(id => entities.comments[id]);
  const users = comments.map(comment => entities.users[comment.author]);
  const currentUser = (auth.isAuthenticated && entities.users[auth.user]) || {};
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
