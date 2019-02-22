import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import { getAll, updateRating, deleteFavorite } from '../actions/favoritesActions';

const FavoritesContainer = ({ favorites, updateRating, deleteFavorite }) => (
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
            onDelete={ () => deleteFavorite(imdbID) }
          />
        </li>
      ))
    }
    {
      (Object.keys(favorites).length === 0)
        ? <p className='message'>Favorites list empty.</p>
        : null
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
    },
    deleteFavorite(imdbID) {
      dispatch(deleteFavorite(imdbID))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);