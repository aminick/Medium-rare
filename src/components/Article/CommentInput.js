import React, { useState } from "react";

const CommentInput = props => {
  const [comment, setComment] = useState("");
  const handleCommentChange = event => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = event => {
    event.preventDefault();
    alert(comment, "submit!");
    setComment("");
  };
  return (
    <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
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

export default CommentInput;
