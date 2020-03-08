import React from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
export class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName}></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => ({
  appName: common.appName
});

export default connect(mapStateToProps)(App);
