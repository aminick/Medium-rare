import React from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import MainView from "./MainView";
import { loadArticlesAll } from "../../actions/api";

export class Home extends React.Component {
  componentDidMount() {
    this.props.loadArticlesAll();
  }

  render() {
    return (
      <div>
        <Banner appName={this.props.appName}></Banner>
        <section className="section">
          <div className="container">
            <div className="columns">
              <MainView />
              <div className="column">
                <div className="">
                  <p>Popular Tags</p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
