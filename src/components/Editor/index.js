import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { union } from "lodash";
import { createArticle } from "../../actions/api";
import { useHistory, useParams } from "react-router-dom";
import { loadArticle, updateArticle } from "../../actions/api";

const Editor = props => {
  const { createArticle, loadArticle, updateArticle } = props;
  const { currentUser } = props;

  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: []
  });

  const [tag, setTag] = useState("");
  const history = useHistory();
  const { slug } = useParams();

  useEffect(() => {
    if (slug)
      loadArticle(slug).then(action => {
        const { response } = action;
        if (!response) {
          history.replace({ pathname: "/" });
        } else {
          const slug = response.result.article;
          const article = response.entities.articles[slug];
          if (article.author != currentUser) {
            history.replace({ pathname: "/" });
          } else {
            setArticle(article);
          }
        }
      });
  }, [loadArticle, setArticle, slug, currentUser]);

  const handleEditorChange = event => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const enterClick = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setArticle({ ...article, tagList: union(article.tagList, [tag]) });
      setTag("");
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const payload = { article };
    if (slug) {
      updateArticle(slug, payload).then(action => {
        if (action.response) {
          history.replace({
            pathname: `/article/${action.response.result.article}`
          });
        }
      });
    } else {
      createArticle(payload).then(action => {
        if (action.response) {
          history.replace({
            pathname: `/article/${action.response.result.article}`
          });
        }
      });
    }
  };

  const removeTag = tag => {
    setArticle({ ...article, tagList: article.tagList.filter(t => t !== tag) });
  };

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-size-10 is-offset-1">
            <div className="column">
              <div className="field">
                <label className="control">Title</label>
                <input
                  type="text"
                  name="title"
                  className="input"
                  value={article["title"] || ""}
                  onChange={handleEditorChange}
                />
              </div>

              <div className="field">
                <label className="control">Description</label>
                <input
                  type="text"
                  name="description"
                  className="input"
                  value={article["description"] || ""}
                  onChange={handleEditorChange}
                />
              </div>

              <div className="field">
                <textarea
                  type="text"
                  name="body"
                  className="textarea"
                  value={article["body"] || ""}
                  onChange={handleEditorChange}
                />
              </div>

              <div className="field">
                <label className="control">Tags</label>
                <input
                  type="text"
                  className="input"
                  value={tag}
                  onChange={event => setTag(event.target.value)}
                  onKeyUp={enterClick}
                />

                <div className="">
                  {article.tagList &&
                    article.tagList.map(tag => (
                      <span className="tag is-light" key={tag}>
                        <span onClick={() => removeTag(tag)}>❌</span>
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <button className="button is-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ auth }, ownProps) => {
  const currentUser = auth.user;
  return {
    currentUser
  };
};

const mapDispatchToProps = {
  createArticle,
  loadArticle,
  updateArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
