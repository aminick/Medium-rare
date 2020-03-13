import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import { useHistory, useLocation } from "react-router-dom";

const Register = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  let location = useLocation();

  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const hanldeSubmit = event => {
    event.preventDefault();
    const creds = {
      user: {
        username,
        email,
        password
      }
    };
    props.registerUser(creds).then(
      () => {
        let { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);
      },
      () => {}
    );
  };

  return (
    <>
      <div className="container">
        <form onSubmit={event => hanldeSubmit(event)}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={handleChangeUsername}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  registerUser: creds => dispatch(registerUser(creds))
});

export default connect(null, mapDispatchToProps)(Register);
