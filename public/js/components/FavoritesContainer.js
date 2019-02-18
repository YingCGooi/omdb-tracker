import React from 'react';
import { connect } from 'react-redux';
import MovieItem from './MovieItem';

const FavoritesContainer = ({ favorites }) => (
  <main id='favorites-container'>
    <ul>
    {
      Object.keys(favorites).map(imdbID => (
        <li key={imdbID}>
          <MovieItem movie={ favorites[imdbID] } isFavorite={true} />
        </li>
      ))
    }
    </ul>
  </main>
);

const mapStateToProps = (state) => (
  { favorites: state.favorites }
)

export default connect(mapStateToProps)(FavoritesContainer);