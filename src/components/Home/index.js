import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import FeedContainer from "./FeedContainer";
import { loadTags } from "../../actions/api";
import "./index.css";

export const Home = props => {
  const { isAuthenticated } = props;
  const { loadTags } = props;
  const [tags, setTags] = useState([]);
  useEffect(() => {
    loadTags().then(action => setTags(action.response.result.tags));
  }, [loadTags, setTags]);

  return (
    <div>
      <Banner appName={props.appName}></Banner>
      <section className="section">
        <div className="container">
          <div className="columns">
            <FeedContainer
              isAuthenticated={isAuthenticated}
              render={handleTabClick => (
                <div className="column">
                  <p>Popular Tags</p>
                  <div className="tag-container">
                    {tags.map(tag => (
                      <button
                        className="button is-small is-outlined tag"
                        key={tag}
                        onClick={() => handleTabClick(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />
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
  loadTags
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
