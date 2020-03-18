import React from "react";
import AuthorMeta from "./AuthorMeta";

const ArticleMeta = props => {
  const {
    title,
    description,
    body,
    author,
    createdAt,
    tagList,
    isAuthor
  } = props;

  const { handleEditClick, handleDeleteClick } = props;
  return (
    <div>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{description}</h2>
            <AuthorMeta {...{ ...author, createdAt }} />
            {isAuthor && (
              <div className="actions-container">
                <button className="button" onClick={handleEditClick}>
                  Edit
                </button>
                <button className="button" onClick={handleDeleteClick}>
                  Delete
                </button>
              </div>
            )}
            <div className="tag-list">
              {tagList &&
                tagList.map(tag => (
                  <span className="tag is-light" key={tag}>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <hr style={{ margin: 0 }} />
      </section>

      <section className="section">
        <div className="container">
          <p className="content">{body}</p>
        </div>
      </section>
    </div>
  );
};

export default ArticleMeta;
