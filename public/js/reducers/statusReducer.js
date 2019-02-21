const initialState = {
  search: '',
  searchError: '',
  saveFavorite: '',
  saveFavoriteError: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      state = { 
        ...state, 
        search: 'PENDING', 
        searchError: '',
      }
      break;

    case 'SEARCH_SUCCESS':
      state = { 
        ...state, 
        search: 'SUCCESS', 
        searchError: '',
      }
      break;

    case 'SEARCH_FAILURE':
      state = { 
        ...state,
        search: 'ERROR',
        searchError: action.error,
      }
      break;

    case 'SAVE_FAVORITE_REQUEST':
      state = {
        ...state,
        saveFavorite: 'PENDING',
        saveFavoriteError: '',
      }
      break;

    case 'SAVE_FAVORITE_SUCCESS':
      state = {
        ...state,
        saveFavorite: 'SUCCESS',
        saveFavoriteError: '',
      }
      break;

    case 'SAVE_FAVORITE_FAILURE':
      state = {
        ...state,
        saveFavorite: 'ERROR',
        saveFavoriteError: action.error,
      }
      break;

    default: return state;
  }
  return state;
}