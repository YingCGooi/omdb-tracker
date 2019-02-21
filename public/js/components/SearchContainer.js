import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import SearchInputForm from './SearchInputForm';
import apiClient from '../apiClient';
import { search } from '../actions/searchActions';

const SearchContainer = (props) => (
  <main id='search-container'>
    <SearchInputForm 
      placeholder='Search movie title...'
      onSubmit={ (title) => props.search(title) }
    />
    {
      props.result.title
      ? <MovieItem
          show={ props.result.title }
          movie={ props.favoriteInfo ? props.favoriteInfo : props.result }
          isFavorite={ !!props.favoriteInfo }
          handleFavoriteButtonClicked={ props.handleFavoriteButtonClicked }
        />
      : null
    }
  </main>
);

const mapStateToProps = (state) => (
  {
    result: state.search,
    favoriteInfo: state.favorites[state.search.imdbID],
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    search: (title) => {
      dispatch(search(title))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);