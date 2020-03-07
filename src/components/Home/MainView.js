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

const mapStateToProps = ({ articlesState }) => ({
  articles: articlesState.articles,
  isFetching: articlesState.isFetching,
  error: articlesState.error
});

export default connect(mapStateToProps)(MainView);
