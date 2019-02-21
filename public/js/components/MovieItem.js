import React from 'react';
import FavoriteInfo from './FavoriteInfo';

const MovieItem = ({ movie, isFavorite, handleFavoriteButtonClicked, editable, onRate }) => (
  <article className='movie'>
    <div className='poster'>
      {
        (movie.poster === 'N/A')
          ? <img src='images/300x466.png' />
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
              editable={ editable }
              onRate={ onRate }
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