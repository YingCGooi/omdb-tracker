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

export const resetSaveFavoriteStatus = () => ({
  type: 'RESET_SAVE_FAVORITE'
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

export const getAllRequest = () => ({
  type: 'GET_FAVORITES_REQUEST'
});

export const getAllSuccess = (favorites) => ({
  type: 'GET_FAVORITES_SUCCESS', favorites
});

export const getAllFailure = (error) => ({
  type: 'GET_FAVORITES_FAILURE', error
});

export function getAll() {
  return (dispatch) => {
    dispatch(getAllRequest());

    apiClient.getAllFavorites()
      .then(res => {
        dispatch(getAllSuccess(res.data))
      })
      .catch(err => {
        dispatch(getAllFailure(err.response.data))
      });
  }
}