import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSettings } from "../../actions";

export const Settings = props => {
  const [user, setUser] = useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    let { currentUser } = props;
    setUser({
      ...currentUser
    });
  }, [props.currentUser]);

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.updateSettings({ user });
  };

  return (
    <div className="container">
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <h1 className="is-size-3">Settings</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">User Avatar</label>
              <input
                className="input"
                type="text"
                name="image"
                value={user.image || ""}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="label">Username</label>
              <input
                className="input"
                type="text"
                name="username"
                value={user.username || ""}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="label">Bio</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="bio"
                  value={user.bio || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <hr />
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="text"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="text"
                name="password"
                value={user.password || ""}
                placeholder="New Password"
                onChange={handleChange}
              />
            </div>
            <hr />
            <div className="field">
              <div className="control">
                <button className="button is-link">Apply Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, entities }) => ({
  currentUser: entities.users[auth.user]
});

const mapDispatchToProps = dispatch => ({
  updateSettings: settings => dispatch(updateSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
