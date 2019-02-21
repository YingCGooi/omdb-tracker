const initialState = {
  search: '',
  searchError: '',
  saveFavorite: '',
  saveFavoriteError: '',
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
    }
  }

  const statesToUpdate = actionHandlers[action.type];
  state = Object.assign({}, state, statesToUpdate);
  return state;
}