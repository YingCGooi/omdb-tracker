import React from 'react';
import RatingForm from './RatingForm';

const FavoriteInfo = ({ rating, imdbID, comment, editable, onRate }) => (
  <section className='favorite-info'>
    <div className='hr'></div>
    <span>Rating: </span>
    <RatingForm 
      rating={ rating }
      imdbID={ imdbID }
      editable={ editable }
      onRate={ onRate }
    />
    <p><span>Comment:</span> { comment }</p>
    {
      (editable)
        ? <button className='remove'>Remove</button>
        : null
    }
  </section>
);

export default FavoriteInfo;