import React from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import MainView from "./MainView";
import { loadArticlesAll } from "../../actions/articles";

export class Home extends React.Component {
  componentDidMount() {
    this.props.loadArticlesAll();
  }

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName}></Banner>
        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => ({
  appName: common.appName
});

const mapDispatchToProps = dispatch => ({
  loadArticlesAll: () => dispatch(loadArticlesAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
