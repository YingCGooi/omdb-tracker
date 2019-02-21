import React from 'react';
import FavoriteInfo from './FavoriteInfo';

const MovieItem = ({ movie, ...props }) => (
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
        (props.isFavorite) 
          ? <FavoriteInfo 
              rating={ movie.rating } 
              comment={ movie.comment }
              editable={ props.editable }
              onRate={ props.onRate }
              onDelete={ props.onDelete }
            />
          : <button 
              className='favorite'
              onClick={ props.handleFavoriteButtonClicked }
            >
              Add To Favorites
            </button> 
      }
    </div>
  </article>
)

export default MovieItem;