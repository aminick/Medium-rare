import React from "react";
import { connect } from "react-redux";
import ArticlePreview from "../ArticlePreview";
import List from "../List";

const Feed = props => {
  const renderAritlcePreview = slug => (
    <ArticlePreview slug={slug} key={slug} />
  );

  return <List renderItem={renderAritlcePreview} items={props.slugs || []} />;
};

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.tab) {
    case "personal": {
      return state.pagination.feed.personal;
    }
    case "global": {
      return state.pagination.feed.global;
    }
  }
};

export default connect(mapStateToProps)(Feed);
