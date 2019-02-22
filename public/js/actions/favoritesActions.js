import apiClient from '../apiClient';

// save favorite actions
export const saveFavoriteSuccess = (favorite) => ({
  type: 'SAVE_FAVORITE_SUCCESS', favorite
});

export const saveFavoriteFailure = (error) => ({
  type: 'SAVE_FAVORITE_FAILURE', error
});

// get all favorites actions
export const getAllSuccess = (favorites) => ({
  type: 'GET_FAVORITES_SUCCESS', favorites
});

export const getAllFailure = (error) => ({
  type: 'GET_FAVORITES_FAILURE', error
});

// update rating actions
export const updateRatingSuccess = (favorite) => ({
  type: 'UPDATE_RATING_SUCCESS', favorite
});

export const updateRatingFailure = (error) => ({
  type: 'UPDATE_RATING_FAILURE', error
});

// delete favorite actions
export const deleteFavoriteSuccess = (imdbID) => ({
  type: 'DELETE_FAVORITE_SUCCESS', imdbID
});

export const deleteFavoriteError = () => ({
  type: 'DELETE_FAVORITE_FAILURE'
});


// CRUD API call actions
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

export function updateRating(imdbID, value) { 
  return (dispatch) => {
    apiClient.updateRating(imdbID, value)
      .then(res => {
        dispatch(updateRatingSuccess(res.data))
      })
      .catch(err => {
        dispatch(updateRatingFailure(err.response.data))
      });
  }
}

export function deleteFavorite(imdbID) {
  return (dispatch) => {
    apiClient.deleteFavorite(imdbID)
      .then(res => {
        dispatch(deleteFavoriteSuccess(imdbID))
      })
      .catch(err => {
        dispatch(deleteFavoriteFailure(err.response.data))
      })
  }
}