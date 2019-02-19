import React from 'react';
import RatingForm from './RatingForm';

const FavoriteInfo = ({ rating, imdbID, comment }) => (
  <section className='favorite-info'>
    <div className='hr'></div>
    <span>Rating: </span><RatingForm rating={ rating } imdbID={ imdbID }/>
    <p><span>Comment:</span> { comment }</p>
    <button className='remove'>Remove</button>
  </section>
);

export default FavoriteInfo;