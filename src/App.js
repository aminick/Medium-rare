import React from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
export class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName}></Header>
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.appName
});

export default connect(mapStateToProps)(App);
