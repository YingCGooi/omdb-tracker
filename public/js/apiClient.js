import axios from 'axios';

const SEARCH_URL = (title) => '/api/search?title=' + title;

function extractData(response) {
  return response.data
}

const apiClient = {
  query(title, success, error) {
    title = encodeURIComponent(title);

    return axios.get(SEARCH_URL(title))
      .then(extractData)
      .then(success)
      .catch(error);
  }
}

window.apiClient = apiClient;
window.axios = axios;

export default apiClient;