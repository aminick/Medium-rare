import React from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import FeedContainer from "./FeedContainer";
import { loadGlobalFeed, loadPersonalFeed } from "../../actions/api";

export const Home = props => {
  const { isAuthenticated } = props;

  return (
    <div>
      <Banner appName={props.appName}></Banner>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-quarters">
              <FeedContainer isAuthenticated={isAuthenticated} />
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
