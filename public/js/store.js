import { createStore, combineReducers } from 'redux';

import search from './reducers/searchReducer';
import favorites from './reducers/favoritesReducer';

export default createStore(
  combineReducers({
    search,
    favorites
  }),
)