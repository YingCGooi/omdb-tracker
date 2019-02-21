import React from 'react';
import { connect } from 'react-redux';

import MovieItem from './MovieItem';
import { getAll } from '../actions/favoritesActions';

class FavoritesContainer extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const favorites = this.props.favorites;

    return(
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
    )
  }
}

const mapStateToProps = (state) => (
  { 
    favorites: state.favorites,
  }
)

const mapDispatchToProps = (dispatch) => (
  { 
    getAll() {
      dispatch(getAll())
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);