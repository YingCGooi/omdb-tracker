import React from 'react';

class RatingForm extends React.Component {
  state = {
    hoverStars: 0,
  };

  starClassName = (value) => {
    const hoverStars = this.state.hoverStars;

    if (value <= hoverStars) return 'bright yellow star icon';
    if (value <= this.props.rating) return 'yellow star icon';
    return 'grey star outline icon';
  }

  render() {
    return(
      <div className='rating-form'>
      {
        [1, 2, 3, 4, 5].map(value => (
          <label 
            key={value}
            onMouseEnter={ () => this.setState({ hoverStars: value }) }
            onMouseLeave={ () => this.setState({ hoverStars: 0 }) }
          >
            <input type='radio' name='rating' value={ value } />
            <i className={ this.starClassName(value) } />
          </label>
        ))
      }
      </div>
    )
  }
}

export default RatingForm;