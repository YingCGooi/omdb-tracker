import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import { getAll, updateRating } from '../actions/favoritesActions';

const FavoritesContainer = ({ favorites, updateRating }) => (
  <main id='favorites-container'>
    <ul>
    {
      Object.keys(favorites).map(imdbID => (
        <li key={imdbID}>
          <MovieItem 
            movie={ favorites[imdbID] } 
            isFavorite={true}
            editable={true}
            onRate={ (value) => updateRating(imdbID, value) }
          />
        </li>
      ))
    }
    </ul>
  </main>
)

const mapStateToProps = (state) => (
  { 
    favorites: state.favorites,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    updateRating(imdbID, value) {
      dispatch(updateRating(imdbID, value))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);