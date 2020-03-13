import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { doLogoutUser } from "../actions/auth";
import "bulma/css/bulma.css";

const LoggedOutNavItems = props => (
  <>
    <Link
      to="/register"
      className="nav-link navbar-item"
      onClick={() => props.hanldeNotActive()}
    >
      Sign up
    </Link>
    <Link
      to="/login"
      className="nav-link navbar-item"
      onClick={() => props.hanldeNotActive()}
    >
      Sign in
    </Link>
  </>
);

const LoggedInNavItems = props => (
  <>
    <Link
      to="/editor"
      className="nav-link navbar-item"
      onClick={() => props.hanldeNotActive()}
    >
      New Post
    </Link>

    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">{props.user}</a>
      <div className="navbar-dropdown">
        <Link
          to="/settings"
          className="nav-link navbar-item"
          onClick={() => props.hanldeNotActive()}
        >
          Settings
        </Link>
        <Link
          to={`/@${props.user}`}
          className="nav-link navbar-item"
          onClick={() => props.hanldeNotActive()}
        >
          Profile
        </Link>
        <hr className="navbar-divider" />
        <a className="navbar-item" onClick={() => props.handleLogout()}>
          Log out
        </a>
      </div>
    </div>
  </>
);

const Navbar = props => {
  const { user } = props;
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const hanldeNotActive = () => {
    setIsActive(false);
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <Link to="/" className="">
              {props.appName.toLowerCase()}
            </Link>
          </a>
          <a
            role="button"
            className="navbar-burger"
            onClick={() => handleClick()}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            <Link
              to="/"
              className="nav-link navbar-item"
              onClick={() => hanldeNotActive()}
            >
              Home
            </Link>

            {user ? (
              <LoggedInNavItems
                user={user}
                hanldeNotActive={hanldeNotActive}
                handleLogout={props.doLogoutUser}
              />
            ) : (
              <LoggedOutNavItems hanldeNotActive={hanldeNotActive} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

const mapDispatchToProps = dispatch => ({
  doLogoutUser: () => dispatch(doLogoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
