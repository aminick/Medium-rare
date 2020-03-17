import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";

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
              <Link
                to={`@${author.username}`}
                className="is-size-6 has-text-black"
              >
                {author.username}
              </Link>
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

const getArticleMeta = (state, props) => {
  return state.entities.articles[props.slug];
};
const getAuthorMeta = (state, props) =>
  state.entities.users[getArticleMeta(state, props).author];

const getArticle = createSelector(
  [getArticleMeta, getAuthorMeta],
  (article, author) => {
    return { ...article, author: author };
  }
);

const mapStateToProps = (state, ownProps) => {
  return {
    article: getArticle(state, ownProps)
  };
};

export default connect(mapStateToProps)(ArticlePreview);
