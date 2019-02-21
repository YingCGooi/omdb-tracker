const initialState = {
  search: '',
  searchError: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      state = { 
        ...state, 
        search: 'PENDING', 
        searchError: '' 
      }
      break;

    case 'SEARCH_SUCCESS':
      state = { 
        ...state, 
        search: 'SUCCESS', 
        searchError: '' 
      }
      break;

    case 'SEARCH_FAILURE':
      state = { 
        ...state,
        search: 'ERROR',
        searchError: action.error,
      }
      break;

    default: return state;
  }
  return state;
}