import React from 'react';
import RatingForm from './RatingForm';
import { connect } from 'react-redux';
import { save, resetSaveFavoriteStatus } from '../actions/favoritesActions';

class AddFavoriteForm extends React.Component {
  state = {
    rating: 0,
    comment: '',
    errors: {}
  }

  onRate = (value) => {
    this.setState({ rating: value });
  }

  onInputChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  validate = () => {
    const { rating, comment } = this.state;
    const errors = {};
    const e = errors;

    if (comment.trim().length === 0) e.comment = 'Comment is required!';
    if (comment.length > 128) e.comment = 'Comment must not exceed 128 letters.';
    if (rating > 5 || rating < 0) e.rating = 'Rating has to be 0-5.';

    return errors;
  }

  onFormSubmit = (event) => {
    event.preventDefault();    
    const errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length > 0) return;

    const payload = this.buildPayload(this.props.movie);
    this.props.save(payload);
  }

  buildPayload = (movie) => {
    movie.rating = this.state.rating;
    movie.comment = this.state.comment;
    return movie;
  }

  resetState = () => {
    this.setState({
      rating: 0,
      comment: '',
      errors: {}
    });
  }

  render() {
    const movie = this.props.movie;
    const commentError = this.state.errors.comment;

    return (
      <div id='add-favorite'>
        <h2>Add To Favorites: <span>{ movie.title } ({ movie.year })</span></h2>

        <form onSubmit={ this.onFormSubmit }>
          <div className='poster'>
            {
              (movie.poster === 'N/A')
                ? <img src='http://via.placeholder.com/300x466' />
                : <img src={ movie.poster } />
            }
          </div>

          <fieldset>
            <label>
              Rate this movie:
              <span className='error'>{ this.state.errors.rating }</span>
            </label>
            
            <RatingForm 
              rating={ this.state.rating }
              imdbID={ movie.imdbID }
              onRate={ this.onRate }
              editable={ true }
            />

            <div className='hr'></div>            

            <label htmlFor='comment'>
              Add your comment:
              <span className='error'> { commentError }</span>
            </label>
            <input 
              id='comment'
              className={ commentError ? 'error' : '' }
              type='text' 
              name='comment' 
              placeholder='A few words about this movie...'
              onChange={ this.onInputChange }
              value={ this.state.comment }
            />

            <button type='submit'>Save</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    movie: state.search,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save(movie) {
      dispatch(save(movie))
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddFavoriteForm);