import axios from 'axios';

const SEARCH_URL = (title) => '/api/search?title=' + title;

const apiClient = {
  query(title, success, error) {
    title = encodeURIComponent(title);

    return axios.get(SEARCH_URL(title));
  }
}

window.apiClient = apiClient;
window.axios = axios;

export default apiClient;