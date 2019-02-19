import React from 'react';
import FavoriteInfo from './FavoriteInfo';

const MovieItem = ({ movie, isFavorite, handleFavoriteButtonClicked }) => (
  <article className='movie'>
    <div className='poster'>
      {
        (movie.poster === 'N/A')
          ? <img src='http://via.placeholder.com/300x466' />
          : <img src={ movie.poster } />
      }
    </div>
    <div className='info'>
      <div>
        <h2>{ movie.title } <span>({ movie.year })</span></h2>
        <p>{ movie.plot }</p>
      </div>
      {
        (isFavorite) 
          ? <FavoriteInfo 
              rating={ movie.rating } 
              comment={ movie.comment } 
              imdbId={ movie.imdbID }
            />
          : <button 
              className='favorite'
              onClick={ handleFavoriteButtonClicked }
            >
              Add To Favorites
            </button> 
      }
    </div>
  </article>
)

export default MovieItem;