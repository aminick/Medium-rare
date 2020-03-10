import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = props => {
  const { user } = props;
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {props.appName.toLowerCase()}
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {user}
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps)(Header);
