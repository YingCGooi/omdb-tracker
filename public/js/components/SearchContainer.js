import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';

const SearchContainer = ({ result, favoriteInfo, handleFavoriteButtonClicked }) => (
  <main id='search-container'>
    <form>
      <input
        id='title'
        name='title'
        type='text'
        placeholder='Search movie title'
      />
      <button type='submit'>
        <i className='search icon'></i>
      </button>
    </form>
    <MovieItem
      movie={ favoriteInfo ? favoriteInfo : result }
      isFavorite={ !!favoriteInfo }
      handleFavoriteButtonClicked={ handleFavoriteButtonClicked }
    />
  </main>
);

const mapStateToProps = (state) => (
  {
    result: state.search,
    favoriteInfo: state.favorites[state.search.imdbID],
  }
);

export default connect(mapStateToProps)(SearchContainer);