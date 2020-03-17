import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Article from "./components/Article";
import Profile from "./components/Profile";
import Editor from "./components/Editor";
import { getCurrentUser } from "./actions/auth";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to={{ pathname: "/login" }} />}
    </Route>
  );
};

export const App = props => {
  const { getCurrentUser } = props;
  const { auth } = props;

  useEffect(() => {
    const token = window.localStorage.getItem("id_token");
    if (token) getCurrentUser(token);
  }, [getCurrentUser]);

  return (
    <div>
      <Navbar appName={props.appName}></Navbar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/@:username" component={Profile} />
        <Route path="/article/:slug" component={Article} />
        <PrivateRoute path="/settings" isAuthenticated={auth.isAuthenticated}>
          <Settings />
        </PrivateRoute>
        <PrivateRoute path="/editor" isAuthenticated={true}>
          <Editor />
        </PrivateRoute>
      </Switch>
      <Error />
    </div>
  );
};

const mapStateToProps = ({ common, auth }) => ({
  appName: common.appName,
  auth: auth
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: token => dispatch(getCurrentUser(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
