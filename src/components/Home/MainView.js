import React from "react";
import { connect } from "react-redux";
import List from "../List";
import ArticlePreview from "../ArticlePreview";

export const MainView = ({ articles, error, personalFeed }) => {
  const renderAritlcePreview = article => (
    <ArticlePreview article={article} key={article.slug} />
  );

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a href="/" className="nav-link active">
              Global Feed
            </a>
          </li>
        </ul>
      </div>

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
    personalFeed: { articles, error }
  } = feeds;

  // TO-DO - Medium
  // Decouple Author & Articles data on the view level
  const getArticles = articles.map(slug => {
    const article = entities.articles[slug];
    const author = entities.users[article.author];
    return Object.assign({}, article, { author: author });
  });

  return {
    personalFeed: feeds.personalFeed,
    articles: getArticles
  };
};

export default connect(mapStateToProps)(MainView);
