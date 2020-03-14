import React from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/api";

const Comment = props => {
  const { id, slug, author, body, currentUser } = props;
  const { username, image } = author;

  const handleDeleteComment = () => {
    props.deleteComment(slug, id);
  };

  return (
    <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img className="is-rounded" src={image} />
          </p>
        </figure>

        <div className="media-content">
          <div className="content">
            <p>
              <strong>{username}</strong>
              <br />
              {body}
            </p>
          </div>
        </div>
        {username === currentUser.username ? (
          <div className="media-right">
            <button className="delete" onClick={handleDeleteComment}></button>
          </div>
        ) : null}
      </article>
    </>
  );
};

const mapDispatchToProps = {
  deleteComment
};

export default connect(null, mapDispatchToProps)(Comment);
