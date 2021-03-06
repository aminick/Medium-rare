import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { loadProfile } from "../../actions/api";
import { isEmpty } from "lodash";
import { followUser, unfollowUser } from "../../actions/api";
import "./profile.css";
import ArticlesContainer from "./ArticlesContainer";

const Profile = props => {
  const { user } = props;
  const { loadProfile, followUser, unfollowUser } = props;
  const username = props.match.params.username;

  useEffect(() => {
    loadProfile(username);
  }, [username, loadProfile]);

  const handleFollow = username => {
    user.following ? unfollowUser(username) : followUser(username);
  };

  if (isEmpty(user)) return <></>;

  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered ">
            <h1 className="title">{user.username}</h1>
            <p className="image is-64x64 avatar">
              <img
                className="is-rounded"
                src={
                  user.image ||
                  "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
              />
            </p>
            <div
              className={`button ${!user.following &&
                "is-danger"} is-outlined follow-button`}
              onClick={() => handleFollow(user.username)}
            >
              Follow{user.following && "ing"}
            </div>
          </div>
        </div>
      </section>
      <hr style={{ margin: 10 }} />
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <ArticlesContainer username={user.username} />
        </div>
      </div>
    </>
  );
};

const getUserProfile = createSelector(
  (state, props) => state.entities.users[props.match.params.username],
  user => user || {}
);

const mapStateToProps = (state, ownProps) => ({
  user: getUserProfile(state, ownProps)
});

const mapDispatchToProps = {
  loadProfile,
  followUser,
  unfollowUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
