import axios from 'axios';

const SEARCH_URL = (title) => '/api/search?title=' + title;
const FAVORITES_URL = '/api/favorites';
const FAVORITE_URL = (imdbID) => '/favorites/' + imdbID;

const apiClient = {
  query(title) {
    title = encodeURIComponent(title);
    return axios.get(SEARCH_URL(title));
  },

  save(movie) {
    return axios.post(FAVORITES_URL, movie);
  },

  getAllFavorites() {
    return axios.get(FAVORITES_URL);
  },

  updateRating(imdbID, value) {
    return axios.patch(FAVORITE_URL(imdbID), {
      rating: value,
    });
  }
}

window.apiClient = apiClient;
window.axios = axios;

export default apiClient;