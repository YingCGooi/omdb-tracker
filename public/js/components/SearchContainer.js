import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import SearchInputForm from './SearchInputForm';

const SearchContainer = ({ result, favoriteInfo, handleFavoriteButtonClicked }) => (
  <main id='search-container'>
    <SearchInputForm 
      placeholder='Search movie title...'
      onSubmit={() => ()}
    />
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