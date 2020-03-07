import React from "react";
import ArticlePreview from "./ArticlePreview";

export const ArticleList = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="article-preview">No articles are here ... yet :(</div>
    );
  }
  return (
    <div>
      {articles.map(article => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
