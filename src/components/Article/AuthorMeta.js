import React from "react";
import { Link } from "react-router-dom";
import "./AuthorMeta.css";
const AuthorMeta = props => {
  const { image, username, createdAt } = props;
  return (
    <div>
      <div className="author-image-container">
        <figure className="image is-32x32">
          <img className="is-rounded" src={image} alt={username} />
        </figure>
      </div>
      <div className="author-meta-container">
        <Link to={`/@${username}`} className="is-size-6 has-text-dark">
          {username}
        </Link>
        <p className="is-size-7">{new Date(createdAt).toDateString()}</p>
      </div>
    </div>
  );
};

export default AuthorMeta;
