import axios from 'axios';

const SEARCH_URL = (title) => '/api/search?title=' + title;
const FAVORITES_URL = '/api/favorites';
const FAVORITE_URL = (imdbID) => '/api/favorites/' + imdbID;

const apiClient = {
  query(title) {
    title = encodeURIComponent(title);
    return axios.get(SEARCH_URL(title));
  },

  saveFavorite(movie) {
    return axios.post(FAVORITES_URL, movie);
  },

  getAllFavorites() {
    return axios.get(FAVORITES_URL);
  },

  updateRating(imdbID, value) {
    return axios.patch(FAVORITE_URL(imdbID), {
      rating: value,
    });
  },

  deleteFavorite(imdbID) {
    return axios.delete(FAVORITE_URL(imdbID));
  },
}

window.apiClient = apiClient;
window.axios = axios;

export default apiClient;