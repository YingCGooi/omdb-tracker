import apiClient from '../apiClient';

export const saveFavoriteRequest = (movie) => ({
  type: 'SAVE_FAVORITE_REQUEST', movie
});

export const saveFavoriteSuccess = (favorite) => ({
  type: 'SAVE_FAVORITE_SUCCESS', favorite
});

export const saveFavoriteFailure = (error) => ({
  type: 'SAVE_FAVORITE_FAILURE', error
});

export function save(movie) {
  return (dispatch) => {
    dispatch(searchRequest());

    apiClient.query(title)
      .then(response => {
        dispatch(searchSuccess(response.data))
      })
      .catch(error => {
        dispatch(searchFailure(error.response.data))
      });
  }
}