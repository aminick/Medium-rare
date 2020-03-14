import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleMeta from "./ArticleMeta";
import CommentsContainer from "./CommentsContainer";
import Error from "../Error";
import { loadArticle, loadComments } from "../../actions/api";
import { unloadArticle } from "../../actions";

const Article = props => {
  const { slug } = useParams();
  const { article, author } = props;
  const { loadArticle, loadComments, onUnload } = props;

  useEffect(() => {
    loadArticle(slug);
    loadComments(slug);
    return () => {
      onUnload();
    };
  }, [loadArticle, loadComments, onUnload, slug]);

  return (
    <div>
      <ArticleMeta {...article} author={author} />
      <CommentsContainer slug={slug} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loadArticle: slug => dispatch(loadArticle(slug)),
  loadComments: slug => dispatch(loadComments(slug)),
  onUnload: () => dispatch(unloadArticle())
});

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
