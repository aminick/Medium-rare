import React, { useEffect } from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import FeedContainer from "./FeedContainer";
import { loadGlobalFeed, loadPersonalFeed } from "../../actions/api";

export const Home = props => {
  const { loadGlobalFeed, isAuthenticated, loadPersonalFeed } = props;
  useEffect(() => {
    isAuthenticated ? loadPersonalFeed() : loadGlobalFeed();
  }, [loadGlobalFeed, loadPersonalFeed, isAuthenticated]);

  const testLoadMore = () => {
    loadGlobalFeed(true);
  };

  return (
    <div>
      <Banner appName={props.appName}></Banner>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-quarters">
              <FeedContainer isAuthenticated={isAuthenticated} />
              <button className="button is-primary" onClick={testLoadMore}>
                Load More
              </button>
            </div>

            <div className="column">
              <p>Popular Tags</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ common, auth }) => ({
  appName: common.appName,
  isAuthenticated: auth.isAuthenticated
});

const mapDispatchToProps = {
  loadPersonalFeed,
  loadGlobalFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
