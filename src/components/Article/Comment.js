import React from "react";

const Comment = props => {
  const { author, body } = props;
  const { username, image } = author;
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
      </article>
    </>
  );
};

export default Comment;
