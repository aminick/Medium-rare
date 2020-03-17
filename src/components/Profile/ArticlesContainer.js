import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  loadPublishedArticles,
  loadFavoritedArticles
} from "../../actions/api";
import ArticlesList from "./ArticlesList";

export const ArticlesContainer = props => {
  const { loadPublishedArticles, loadFavoritedArticles } = props;
  const { username } = props;
  const [tab, setTab] = useState("published");

  useEffect(() => {
    switch (tab) {
      case "published": {
        loadPublishedArticles(username);
        break;
      }
      case "favorited": {
        loadFavoritedArticles(username);
        break;
      }
    }
  }, [loadPublishedArticles, loadFavoritedArticles, tab, username]);

  const handleLoadMore = () => {
    switch (tab) {
      case "published": {
        loadPublishedArticles(username, true);
        break;
      }
      case "favorited": {
        loadFavoritedArticles(username, true);
        break;
      }
    }
  };

  return (
    <>
      <nav className="level border-bottom">
        <div className="level-left">
          <div href="/" className="level-item">
            <button
              className="button is-white"
              onClick={() => setTab("published")}
            >
              Published
            </button>
          </div>

          <p href="/" className="level-item">
            <button
              className="button is-white"
              onClick={() => setTab("favorited")}
            >
              Favorited
            </button>
          </p>
        </div>
      </nav>
      <ArticlesList
        username={username}
        tab={tab}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
};

const mapDispatchToProps = {
  loadPublishedArticles,
  loadFavoritedArticles
};

export default connect(null, mapDispatchToProps)(ArticlesContainer);
