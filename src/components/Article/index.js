import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";

import ArticleMeta from "./ArticleMeta";
import CommentsContainer from "./CommentsContainer";
import { loadArticle, loadComments } from "../../actions/api";

const Article = props => {
  const { slug } = useParams();
  const { article, author } = props;
  const [commentsAsIds, setCommentsAsIds] = useState([]);
  useEffect(() => {
    props.loadArticle(slug);
    props.loadComments(slug).then(response => {
      if (response.response) {
        setCommentsAsIds(response.response.result);
      }
    });
  }, []);

  if (isEmpty(article)) return <div>Loading...</div>;

  return (
    <div>
      <ArticleMeta {...props.article} author={author} />
      <CommentsContainer commentsAsIds={commentsAsIds} />
    </div>
  );
};

const mapDispatchToProps = {
  loadArticle,
  loadComments
};

const mapStateToProps = ({ entities }, ownProps) => {
  const slug = ownProps.match.params.slug;
  const article = entities.articles[slug] || {};
  const author = (article.author && entities.users[article.author]) || "";
  return {
    article,
    author
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
