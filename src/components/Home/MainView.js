import React from "react";
import { connect } from "react-redux";
import ArticleList from "../ArticleList";

export const MainView = ({ articles, isFetching, error }) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a href="/" className="nav-link active">
              Global Feed
            </a>
          </li>
        </ul>
      </div>

      {isFetching ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ArticleList articles={articles} />
      )}

      {error && alert(error)}
    </div>
  );
};

const mapStateToProps = ({ feeds, entities }) => {
  const {
    personalFeed: { isFetching, articles, error }
  } = feeds;

  // TO-DO
  // Decouple Author & Articles data
  const getArticles = articles.map(slug => {
    const article = entities.articles[slug];
    const author = entities.users[article.author];
    return Object.assign({}, article, { author: author });
  });

  return {
    articles: getArticles,
    isFetching: isFetching,
    error: error
  };
};

export default connect(mapStateToProps)(MainView);
