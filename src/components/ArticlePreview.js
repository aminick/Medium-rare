import React from "react";
import { Link } from "react-router-dom";

const ArticlePreview = props => {
  const {
    author,
    createdAt,
    title,
    favoritesCount,
    description,
    tagList,
    slug
  } = props.article;

  return (
    <div className="card">
      <div className="card-content">
        <Link
          to={`/article/${slug}`}
          className="is-size-2 has-text-black has-text-weight-bold"
        >
          {title}
        </Link>
        <p>{description}</p>

        <div className="article-preview-meta">
          <div className="author-meta">
            <div className="author-info">
              <figure className="image is-24x24 author-avatar">
                <img
                  className="is-rounded"
                  src={author.image}
                  alt={author.username}
                />
              </figure>
              <a href="/" className="is-size-6 has-text-black">
                {author.username}
              </a>
            </div>
            <div className="date">
              <span className="is-size-7">
                {new Date(createdAt).toDateString()}
              </span>
            </div>
          </div>
          <span className="tag is-white tag-heart">❤️ {favoritesCount}</span>
          <div className="tag-list">
            {tagList.map(tag => (
              <span className="tag is-light" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
