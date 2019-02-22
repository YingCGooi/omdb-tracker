import apiClient from '../apiClient';


export const saveFavoriteSuccess = (favorite) => ({
  type: 'SAVE_FAVORITE_SUCCESS', favorite
});

export const saveFavoriteFailure = (error) => ({
  type: 'SAVE_FAVORITE_FAILURE', error
});

export const resetSaveFavoriteStatus = () => ({
  type: 'RESET_SAVE_FAVORITE'
});


export const getAllSuccess = (favorites) => ({
  type: 'GET_FAVORITES_SUCCESS', favorites
});

export const getAllFailure = (error) => ({
  type: 'GET_FAVORITES_FAILURE', error
});


export const updateRatingSuccess = (favorite) => ({
  type: 'UPDATE_RATING_SUCCESS', favorite
});

export const updateRatingFailure = (error) => ({
  type: 'UPDATE_RATING_FAILURE', error
});

export const resetUpdateRatingStatus = () => ({
  type: 'RESET_UPDATE_RATING'
});



export function save(movie) {
  return (dispatch) => {
    apiClient.saveFavorite(movie)
      .then(res => {
        dispatch(saveFavoriteSuccess(res.data))
      })
      .catch(err => {
        dispatch(saveFavoriteFailure(err.response.data))
      });
  }
}

export function getAll() {
  return (dispatch) => {
    apiClient.getAllFavorites()
      .then(res => {
        dispatch(getAllSuccess(res.data))
      })
      .catch(err => {
        dispatch(getAllFailure(err.response.data))
      });
  }
}

export function updateRating(imdbId, value) { 
  return (dispatch) => {
    apiClient.updateRating(imdbId, value)
      .then(res => {
        dispatch(updateRatingSuccess(res.data))
      })
      .catch(err => {
        dispatch(updateRatingFailure(err.response.data))
      });
  }
}

export function delete(imdbId) {
  return (dispatch) => {
    apiClient.deleteFavorite(imdbId)
      .then(res => {
        dispatch(deleteFavoriteSuccess())
      })
      .catch(err => {
        dispatch(deleteFavoriteFailure(err.response.data))
      })
  }
}