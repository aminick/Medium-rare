import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ArticlePreview from "../ArticlePreview";
import List from "../List";

const ArticlesList = React.memo(props => {
  const { slugs, isFetching, articlesCount, offset } = props;
  const { handleLoadMore } = props;

  const hasMore = offset + 10 < articlesCount;

  const renderArticlePreview = slug => (
    <ArticlePreview slug={slug} key={slug} />
  );

  return (
    <>
      <List renderItem={renderArticlePreview} items={slugs} />

      {slugs && slugs.length != 0 && hasMore && (
        <button
          type="button"
          className="button is-primary"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </>
  );
});

const getPagination = (state, props) =>
  state.pagination[props.tab][props.username];

const getArticlesByTab = createSelector(
  getPagination,
  pagination => pagination || {}
);

const mapStateToProps = (state, ownProps) => ({
  ...getArticlesByTab(state, ownProps)
});

export default connect(mapStateToProps)(ArticlesList);
