// deprecated
const API_ROOT = "https://conduit.productionready.io/api";

const requests = {
  get: url => fetch(`${API_ROOT}${url}`).then(response => response.json())
};

const Articles = {
  fetchAll: () => requests.get("/articles?limit=10")
};

export default Articles;
