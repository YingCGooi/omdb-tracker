import React from 'react';

class SearchInputForm extends React.Component {
  state = {
    title: '',
    error: '',
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const error = this.validate(title);
    this.setState({ error });

    if (error.length > 0) return;
    this.props.onSubmit(title);
    this.setState({ title: '', error: '' });
  }

  validate = (title) => {
    if (title.trim().length === 0) return 'Title is required!';
    return '';
  }

  render() {
    return (
      <form className='search' onSubmit={this.onFormSubmit}>
        <div className='flex'>
          <input
            id='title'
            className={ this.state.error ? 'error' : '' }
            name='title'
            type='text'
            value={this.state.title}
            placeholder={this.props.placeholder}
            onChange={this.onInputChange}
          />
          <button type='submit'>
            <i className='search icon'></i>
          </button>
        </div>
        <p className='error'>{ this.state.error }</p>
      </form>
    )
  }
}

export default SearchInputForm;