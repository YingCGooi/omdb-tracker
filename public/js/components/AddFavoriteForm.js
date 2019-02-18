import React from 'react';
import RatingForm from './RatingForm';
import { connect } from 'react-redux';

class AddFavoriteForm extends React.Component {
  state = {
    fields: {
      rating: 0,
      comment: ''
    },
    fieldErrors: {},
  }

  onRate = () => {

  }

  render() {
    const movie = this.props.movie;

    return (
      <div id='add-favorite'>
        <h2>Add To Favorites: { movie.title } <span>({ movie.year })</span></h2>

        <form>
          <div className='poster'>
            {
              (movie.poster === 'N/A')
                ? <img src='http://via.placeholder.com/300x466' />
                : <img src={ movie.poster } />
            }
          </div>

          <fieldset>
            <label>Rate this movie:</label>
            <RatingForm 
              rating={ 0 } 
              imdbID={ movie.imdbID }
              updateDB={ false }
              onRate={ this.onRate }
            />

            <div className='hr'></div>            

            <label htmlFor='comment'>Add your comment:</label>
            <input id='comment' type='text' name='comment' placeholder='A few words about this movie...' />

            <button type='submit'>Save</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    movie: state.search
  }
)

export default connect(mapStateToProps)(AddFavoriteForm);