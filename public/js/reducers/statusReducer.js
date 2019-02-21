const initialState = {
  search: '',
  searchError: '',
  saveFavorite: '',
  saveFavoriteError: '',
  updateRating: '',
  updateRatingError: '',
}

export default (state = initialState, action) => {
  const actionHandlers = {
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

    'SAVE_FAVORITE_SUCCESS': {
      saveFavorite: 'SUCCESS',
      saveFavoriteError: '',
    },
    'SAVE_FAVORITE_FAILURE': {
      saveFavorite: 'ERROR',
      saveFavoriteError: action.error,
    },
    'RESET_SAVE_FAVORITE': {
      saveFavorite: '',
      saveFavoriteError: '',
    },

    'UPDATE_RATING_SUCCESS': {
      updateRating: 'SUCCESS',
      updateRatingError: '',
    }
    'RESET_UPDATE_RATING': {
      updateRating: '',
      updateRatingError: '',
    }
  }

  const statesToUpdate = actionHandlers[action.type];
  state = Object.assign({}, state, statesToUpdate);
  return state;
}