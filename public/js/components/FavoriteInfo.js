import React from 'react';
import RatingForm from './RatingForm';

const FavoriteInfo = (props) => (
  <section className='favorite-info'>
    <div className='hr'></div>
    <span>Rating: </span>
    <RatingForm 
      rating={ props.rating }
      imdbID={ props.imdbID }
      editable={ props.editable }
      onRate={ props.onRate }
    />
    <p><span>Comment:</span> { props.comment }</p>
    {
      (props.editable)
        ? <button
            className='remove'
            onClick={ props.onDelete }
          >
            Remove
          </button>
        : null
    }
  </section>
);

export default FavoriteInfo;