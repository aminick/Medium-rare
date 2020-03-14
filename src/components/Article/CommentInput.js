import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/api";

const CommentInput = props => {
  const { currentUser, slug } = props;
  const { image } = currentUser;
  const [comment, setComment] = useState("");
  const handleCommentChange = event => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = event => {
    event.preventDefault();
    props.addComment(slug, {
      comment: {
        body: comment
      }
    });
    setComment("");
  };
  return (
    <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              className="is-rounded"
              src={
                image ||
                "https://static.productionready.io/images/smiley-cyrus.jpg"
              }
            />
          </p>
        </figure>

        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                value={comment}
                name="comment"
                onChange={handleCommentChange}
                id="comment"
              ></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <a className="button is-info" onClick={handleCommentSubmit}>
                  Submit
                </a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </>
  );
};

const mapDispatchToProps = {
  addComment
};

export default connect(null, mapDispatchToProps)(CommentInput);
