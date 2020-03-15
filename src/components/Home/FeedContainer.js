import React, { useState } from "react";
import { connect } from "react-redux";
import { loadGlobalFeed, loadPersonalFeed } from "../../actions/api";
import Feed from "./Feed";

export const FeedContainer = props => {
  const { loadGlobalFeed, loadPersonalFeed } = props;
  const { articles, error, isAuthenticated } = props;
  const [tab, setTab] = useState("personal");

  // useEffect(() => {
  //   loadGlobalFeed();
  // }, [loadGlobalFeed]);

  const handleTabClick = tag => {
    setTab(tag);
    switch (tag) {
      case "personal": {
        loadPersonalFeed();
        break;
      }
      case "global": {
        loadGlobalFeed();
        break;
      }
      default:
        return;
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
      <Feed tab={tab} />
    </>
  );
};

const mapStateToProps = state => {
  const global = state.pagination.feed.global;
  return {
    articles: (global && global.slugs) || []
  };
};

const mapDispatchToProps = {
  loadGlobalFeed,
  loadPersonalFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
