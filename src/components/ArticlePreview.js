import React from "react";

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
    <div className="article-preview">
      <div className="article-meta">
        <a href="/">
          <img src={author.image} alt={author.username} />
        </a>

        <div className="info">
          <a href="/" className="author">
            {author.username}
          </a>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>

        <div className="pull-xs-right">
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            {" " + favoritesCount}
          </button>
        </div>
      </div>

      <a to={`article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {tagList.map(tag => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
};

export default ArticlePreview;
