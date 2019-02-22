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

  handleMouseHover = (value) => {
    if (!this.props.editable) return;
    this.setState({ hoverStars: value });
  }

  handleMouseLeave = () => {
    if (!this.props.editable) return;    
    this.setState({ hoverStars: 0 });
  }

  handleRatingChanged = (event) => {
    if (!this.props.editable) return;
    this.props.onRate(event.target.value);
  }

  render() {
    let className = 'rating-form';
    if (!this.props.editable) className += ' locked';

    return(
      <div className={ className }>
      {
        [1, 2, 3, 4, 5].map(value => (
          <label 
            key={value}
            onMouseEnter={ () => this.handleMouseHover(value) }
            onMouseLeave={ this.handleMouseLeave }
          >
            <input 
              type='radio' 
              name='rating' 
              value={ value }
              onChange={ this.handleRatingChanged }
            />
            <i className={ this.starClassName(value) } />
          </label>
        ))
      }
      </div>
    )
  }
}

export default RatingForm;