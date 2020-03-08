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

const Schemas = {
  USER: user,
  ARTICLES_ARRAY: articles
};

export default Schemas;
