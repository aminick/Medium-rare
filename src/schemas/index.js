import { schema } from "normalizr";

const user = new schema.Entity(
  "users",
  {},
  {
    idAttribute: value => value.username
  }
);
const article = new schema.Entity(
  "articles",
  {
    author: user
  },
  {
    idAttribute: value => value.slug
  }
);

const articles = [article];

const comment = new schema.Entity("comments", {
  author: user
});

const comments = [comment];

const Schemas = {
  USER: user,
  ARTICLES_ARRAY: articles,
  ARTICLE: article,
  COMMENT: comment,
  COMMENTS_ARRAY: comments
};

export default Schemas;
