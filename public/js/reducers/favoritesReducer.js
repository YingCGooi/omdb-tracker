// const initialState = {
//   imdbID1: {
//     title: '',
//     year: '',
//     plot: '',
//     poster: '',
//     rating: '',
//     comment: '',
//   },
//   imdbID2: {
//     title: '',
//     year: '',
//     plot: '',
//     poster: '',
//     rating: '',
//     comment: '',    
//   }
// }

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FAVORITE_SUCCESS':
      state = Object.assign({}, state, action.favorite);
      break;

    case 'GET_FAVORITES_SUCCESS':
      state = action.favorites;
      break;

    case 'UPDATE_RATING_SUCCESS':
      state = Object.assign({}, state, action.favorite);
      break;

    case 'DELETE_FAVORITE_SUCCESS':
      state = Object.assign({}, state);
      delete state[action.imdbID];
      break;

    default: return state;
  }
  return state;
}