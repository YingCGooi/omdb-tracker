import React from 'react';
import RatingForm from './RatingForm';

const FavoriteInfo = ({ rating, imdbID, comments }) => (
  <section className='favorite-info'>
    <div className='hr'></div>
    <span>Rating: </span><RatingForm rating={ rating } imdbID={ imdbID }/>
    <p><span>Comments:</span> { comments }</p>
    <button className='remove'>Remove</button>
  </section>
);

export default FavoriteInfo;