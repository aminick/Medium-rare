import React from "react";
import { connect } from "react-redux";
import ArticleList from "../ArticleList";

export const MainView = props => (
  <div className="col-md-9">
    {/* Feed Type Picker */}
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a href="" className="nav-link active">
            Global Feed
          </a>
        </li>
      </ul>
    </div>
    <ArticleList articles={props.articles} />
  </div>
);

const mapStateToProps = ({ articles }) => ({
  articles: articles
});

export default connect(mapStateToProps)(MainView);
