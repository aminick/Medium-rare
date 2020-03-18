import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  loadGlobalFeed,
  loadPersonalFeed,
  loadTaggedArticles
} from "../../actions/api";
import Feed from "./Feed";

export const FeedContainer = props => {
  const { loadGlobalFeed, loadPersonalFeed, loadTaggedArticles } = props;
  const { error, isAuthenticated } = props;
  const [tab, setTab] = useState(isAuthenticated ? "personal" : "global");

  useEffect(() => {
    switch (tab) {
      case "personal": {
        loadPersonalFeed();
        break;
      }
      case "global": {
        loadGlobalFeed();
        break;
      }
      default: {
        loadTaggedArticles(tab);
      }
    }
  }, [loadGlobalFeed, loadPersonalFeed, tab]);

  const handleTabClick = tab => {
    setTab(tab);
  };

  const handleLoadMore = () => {
    switch (tab) {
      case "personal": {
        loadPersonalFeed(true);
        break;
      }
      case "global": {
        loadGlobalFeed(true);
        break;
      }
      default: {
        loadTaggedArticles(tab, true);
      }
    }
  };

  return (
    <>
      <div className="column is-three-quarters">
        <nav className="level border-bottom">
          <div className="level-left">
            {isAuthenticated && (
              <div className="level-item">
                <button
                  className={`button ${
                    tab === "personal" ? "is-light" : "is-white"
                  }`}
                  onClick={() => handleTabClick("personal")}
                >
                  My Feed
                </button>
              </div>
            )}

            <p href="/" className="level-item">
              <button
                className={`button ${
                  tab === "global" ? "is-light" : "is-white"
                }`}
                onClick={() => handleTabClick("global")}
              >
                Global Feed
              </button>
            </p>
            {tab !== "personal" && tab !== "global" ? (
              <button className="button is-light level-item ">#{tab}</button>
            ) : null}
          </div>
        </nav>

        <Feed tab={tab} handleLoadMore={handleLoadMore} />
      </div>

      <div className="column">{props.render(handleTabClick)}</div>
    </>
  );
};

const mapDispatchToProps = {
  loadGlobalFeed,
  loadPersonalFeed,
  loadTaggedArticles
};

export default connect(null, mapDispatchToProps)(FeedContainer);
