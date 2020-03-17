import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadGlobalFeed, loadPersonalFeed } from "../../actions/api";
import Feed from "./Feed";

export const FeedContainer = props => {
  const { loadGlobalFeed, loadPersonalFeed } = props;
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
    }
  };

  return (
    <>
      <nav className="level border-bottom">
        <div className="level-left">
          {isAuthenticated && (
            <div className="level-item">
              <button
                className="button is-white"
                onClick={() => handleTabClick("personal")}
              >
                My Feed
              </button>
            </div>
          )}

          <p href="/" className="level-item">
            <button
              className="button is-white"
              onClick={() => handleTabClick("global")}
            >
              Global Feed
            </button>
          </p>
        </div>
      </nav>
      <Feed tab={tab} handleLoadMore={handleLoadMore} />
    </>
  );
};

const mapDispatchToProps = {
  loadGlobalFeed,
  loadPersonalFeed
};

export default connect(null, mapDispatchToProps)(FeedContainer);
