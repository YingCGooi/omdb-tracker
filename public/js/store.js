import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import search from './reducers/searchReducer';
import favorites from './reducers/favoritesReducer';

export default createStore(
  combineReducers({
    search,
    favorites
  }),
  {},
  applyMiddleware(thunk)
)