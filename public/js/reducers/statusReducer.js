const initialState = {
  search: '',
  searchError: '',
  saveFavorite: '',
  saveFavoriteError: {},
  updateRating: '',
  updateRatingError: {},
  deleteFavorite: '',
  deleteFavoriteError: {}
}

export default (state = initialState, action) => {
  const actionHandlers = {
    // search statuses
    'SEARCH_REQUEST': {
      search: 'PENDING',
      searchError: '',
    },
    'SEARCH_SUCCESS': {
      search: 'SUCCESS', 
      searchError: '',      
    },
    'SEARCH_FAILURE': {
      search: 'ERROR',
      searchError: action.error, 
    },
    // save favorite statuses
    'SAVE_FAVORITE_SUCCESS': {
      saveFavorite: 'SUCCESS',
      saveFavoriteError: '',
    },
    'SAVE_FAVORITE_FAILURE': {
      saveFavorite: 'ERROR',
      saveFavoriteError: action.error,
    },
    // update rating statuses
    'UPDATE_RATING_SUCCESS': {
      updateRating: 'SUCCESS',
      updateRatingError: '',
    },
    'UPDATE_RATING_FAILURE': {
      updateRating: 'ERROR',
      updateRatingError: { errors: action.error },
    },
    // delete favorite statuses
    'DELETE_FAVORITE_SUCCESS': {
      deleteFavorite: 'SUCCESS',
      deleteFavoriteError: '',
    },
    'DELETE_FAVORITE_FAILURE': {
      deleteFavorite: 'ERROR',
      deleteFavoriteError: { errors: 'Cannot delete movie' }
    },
    // reset statuses
    'RESET_ALL_STATUS': initialState,
  }

  const statesToUpdate = actionHandlers[action.type];
  state = Object.assign({}, state, statesToUpdate);
  return state;
}