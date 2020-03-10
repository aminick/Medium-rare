import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { useHistory, useLocation } from "react-router-dom";

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

    props.loginUser(creds).then(() => {
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <a>Need an account?</a>
            </p>

            <form
              onSubmit={e => {
                e.preventDefault();
                hanldeSubmit(email, password);
              }}
            >
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleChangeEmail}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleChangePassword}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: creds => dispatch(loginUser(creds))
});

export default connect(null, mapDispatchToProps)(Login);
