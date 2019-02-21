import axios from 'axios';

const SEARCH_URL = (title) => '/api/search?title=' + title;

const FAVORITES_URL = '/api/favorites';

const apiClient = {
  query(title) {
    title = encodeURIComponent(title);
    return axios.get(SEARCH_URL(title));
  },

  save(movie) {
    return axios.post(FAVORITES_URL, movie);
  },
}

window.apiClient = apiClient;
window.axios = axios;

export default apiClient;