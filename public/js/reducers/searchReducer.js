const initialState = {
  "title": "",
  "year": "",
  "plot": "",
  "poster": "",
  "imdbID": "",
}

export default (state = initialState, action) => {
  if (action.type === 'SEARCH_SUCCESS') {
    state = action.result;
  }
  return state;
}