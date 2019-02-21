import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import { getAll } from '../actions/favoritesActions';

const FavoritesContainer = ({ favorites, handleRate }) => (
  <main id='favorites-container'>
    <ul>
    {
      Object.keys(favorites).map(imdbID => (
        <li key={imdbID}>
          <MovieItem 
            movie={ favorites[imdbID] } 
            isFavorite={true}
            editable={true}
            onRate={ (value) => handleOnRate(value, imdbID) }
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
    handleOnRate(event, imdbID) {
      dispatch()
    }
  }
)

export default connect(mapStateToProps)(FavoritesContainer);