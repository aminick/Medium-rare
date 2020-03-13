import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  let location = useLocation();

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const hanldeSubmit = (email, password) => {
    const creds = {
      user: {
        email: email,
        password: password
      }
    };
    props.loginUser(creds).then(
      () => {
        let { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);
      },
      () => {}
    );
  };

  return (
    <div className="">
      <div className="container">
        <div className="">
          <h1 className="is-size-1">Sign In</h1>
          <p className="">
            <Link to="/register">Need an account?</Link>
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              hanldeSubmit(email, password);
            }}
          >
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleChangeEmail}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChangePassword}
                />
              </div>
            </div>

            <div className="control">
              <button className="button is-primary" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: creds => dispatch(loginUser(creds))
});

export default connect(null, mapDispatchToProps)(Login);
