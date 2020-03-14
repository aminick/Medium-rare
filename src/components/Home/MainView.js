import React from "react";
import { connect } from "react-redux";
import List from "../List";
import ArticlePreview from "../ArticlePreview";

export const MainView = ({ articles, error, personalFeed }) => {
  const renderAritlcePreview = article => (
    <ArticlePreview article={article} key={article.slug} />
  );

  return (
    <div className="column is-three-quarters">
      <nav className="level border-bottom">
        <div className="level-left">
          <p href="/" className="level-item">
            <strong>Global Feed</strong>
          </p>
          <p className="level-item">
            <a>Published</a>
          </p>
        </div>
      </nav>

      <List
        renderItem={renderAritlcePreview}
        items={articles}
        {...personalFeed}
      />
    </div>
  );
};

const mapStateToProps = ({ feeds, entities }) => {
  const {
    globalFeed: { isFetching, articles, error }
  } = feeds;

  const getArticles = articles.map(slug => {
    const article = entities.articles[slug];
    const author = entities.users[article.author];
    return Object.assign({}, article, { author: author });
  });

  return {
    globalFeed: feeds.personalFeed,
    articles: getArticles
  };
};

export default connect(mapStateToProps)(MainView);
