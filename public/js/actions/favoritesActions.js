import apiClient from '../apiClient';

export const saveFavoriteRequest = () => ({
  type: 'SAVE_FAVORITE_REQUEST'
});

export const saveFavoriteSuccess = (favorite) => ({
  type: 'SAVE_FAVORITE_SUCCESS', favorite
});

export const saveFavoriteFailure = (error) => ({
  type: 'SAVE_FAVORITE_FAILURE', error
});

export function save(movie) {
  return (dispatch) => {
    dispatch(saveFavoriteRequest());

    apiClient.save(movie)
      .then(res => {
        dispatch(saveFavoriteSuccess(res.data))
      })
      .catch(err => {
        dispatch(saveFavoriteFailure(err.response.data))
      });
  }
}