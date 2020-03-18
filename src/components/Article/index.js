import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import ArticleMeta from "./ArticleMeta";
import CommentsContainer from "./CommentsContainer";
import { loadArticle, loadComments, deleteArticle } from "../../actions/api";
import { unloadArticle } from "../../actions";

const Article = props => {
  const { slug } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { article, author, isAuthor } = props;
  const { loadArticle, loadComments, deleteArticle, onUnload } = props;

  useEffect(() => {
    loadArticle(slug);
    loadComments(slug);
    return () => {
      onUnload();
    };
  }, [loadArticle, loadComments, onUnload, slug]);

  const handleEditClick = () => {
    history.push({ pathname: `/editor/${slug}` });
  };

  const handleDeleteClick = () => {
    deleteArticle(slug).then(action => {
      if (action.response) {
        let { from } = location.state || {
          from: { pathname: `/@${author.username}` }
        };
        history.replace(from);
      }
    });
  };

  return (
    <div>
      <ArticleMeta
        {...article}
        author={author}
        isAuthor={isAuthor}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <CommentsContainer slug={slug} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loadArticle: slug => dispatch(loadArticle(slug)),
  deleteArticle: slug => dispatch(deleteArticle(slug)),
  loadComments: slug => dispatch(loadComments(slug)),
  onUnload: () => dispatch(unloadArticle())
});

const mapStateToProps = ({ entities, auth }, ownProps) => {
  const slug = ownProps.match.params.slug;
  const article = entities.articles[slug] || {};
  const author = (article.author && entities.users[article.author]) || "";
  const isAuthor = author.username === auth.user;
  return {
    article,
    author,
    isAuthor
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
