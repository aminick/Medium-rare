import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ArticlePreview from "../ArticlePreview";
import List from "../List";

const areEqual = (prevProps, nextProps) => {
  if (prevProps.feed === nextProps.feed) return true;
};

const Feed = React.memo(props => {
  const { handleLoadMore, feed } = props;
  const { isFetching, slugs, articlesCount, offset } = feed || {};
  const hasMore = offset + 10 < articlesCount;

  const renderAritlcePreview = slug => (
    <ArticlePreview slug={slug} key={slug} />
  );

  return (
    <>
      <List renderItem={renderAritlcePreview} items={slugs || []} />
      {slugs &&
        slugs.length !== 0 &&
        (hasMore ? (
          <button
            type="button"
            className="button is-primary"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        ) : (
          <h3>No More</h3>
        ))}
    </>
  );
}, areEqual);

const getTab = (_, props) => props.tab;
const getPagination = (state, _) => state.pagination;
const getFeedByTab = createSelector(
  [getTab, getPagination],
  (tab, pagination) => {
    switch (tab) {
      case "personal": {
        return pagination.feed.personal || undefined;
      }
      case "global": {
        return pagination.feed.global || undefined;
      }
      default: {
        return pagination.tagged[tab];
      }
    }
  }
);

const mapStateToProps = (state, ownProps) => ({
  feed: getFeedByTab(state, ownProps)
});

export default connect(mapStateToProps)(Feed);
