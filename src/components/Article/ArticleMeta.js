import React from "react";
import AuthorMeta from "./AuthorMeta";

const ArticleMeta = props => {
  const { title, description, body, author, createdAt, tagList } = props;
  return (
    <div>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{description}</h2>
            <AuthorMeta {...{ ...author, createdAt }} />
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