import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import SearchInputForm from './SearchInputForm';
import { search } from '../actions/searchActions';

const SearchContainer = (props) => (
  <main id='search-container'>
    <SearchInputForm 
      placeholder='Search movie title...'
      onSubmit={ (title) => props.search(title) }
    />
    {
      (props.searchStatus === 'SUCCESS')
      ? <MovieItem
          movie={ props.favoriteInfo ? props.favoriteInfo : props.result }
          isFavorite={ !!props.favoriteInfo }
          handleFavoriteButtonClicked={ props.handleFavoriteButtonClicked }
          editable={ false }
        />
      : null
    }
    {
      (props.searchStatus === 'PENDING')
      ? <section className='loading'>
          <img src='../../images/loading.gif' />
        </section>
      : null
    }
    {
      (props.searchStatus === 'ERROR')
      ? <section className='error'> 
          <p className='error'>
            <i className="red exclamation triangle icon"></i>
            { props.searchError }
          </p>
        </section>
      : null
    }
  </main>
);

const mapStateToProps = (state) => (
  {
    searchStatus: state.status.search,
    searchError: state.status.searchError,
    result: state.search,
    favoriteInfo: state.favorites[state.search.imdbID],
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    search(title) {
      dispatch(search(title))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);