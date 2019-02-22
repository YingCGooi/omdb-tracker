import React from 'react';
import { connect } from 'react-redux';

import SearchContainer from './SearchContainer';
import FavoritesContainer from './FavoritesContainer';
import AddFavoriteForm from './AddFavoriteForm';
import { 
  resetSaveFavoriteStatus, 
  resetUpdateRatingStatus, 
  resetDeleteFavoriteStatus,
  getAll 
} from '../actions/favoritesActions';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class App extends React.Component {
  state = {
    showAddFavoriteForm: false,
    flashMessage: '' 
  }

  hideForm = () => {
    this.setState({ showAddFavoriteForm: false });
  }

  componentDidMount = () => {
    this.props.getAllFavorites();
  }

  componentDidUpdate = () => {
    const props = this.props;
    if (props.saveFavorite === 'SUCCESS') {
      this.flashMessage('Movie saved to favorites list!');
      this.hideForm();
      props.resetSaveStatus();
    } 
    if (props.saveFavorite === 'ERROR') {
      this.renderErrorFlash(props.saveError);
      props.resetSaveStatus();      
    }
    if (props.updateRating === 'SUCCESS') {
      this.flashMessage('Rating successfully updated!');
      props.resetUpdateStatus();
    }
    if (props.updateRating === 'ERROR') {
      this.renderErrorFlash(props.updateError);
      props.resetUpdateStatus();
    }
    if (props.deleteFavorite === 'SUCCESS') {
      this.flashMessage('Removed movie from favorites list.');
      props.resetDeleteStatus();
    }
    if (props.deleteFavorite === 'ERROR') {
      this.flashMessage('Movie cannot be deleted or does not exist.')
      props.resetDeleteStatus();
    }
  }

  renderErrorFlash = (errorObj) => {
    const message = 
      errorObj.message + ' ' + errorObj.errors.join(',');
    this.flashMessage(message);
  }

  flashMessage = (message) => {
    this.setState({ flashMessage: message });
    setTimeout(() => {
      this.setState({ flashMessage: '' });
    }, 2500)
  }
 
  render() {
    const pathname = window.location.pathname;

    return (
      <Router>
        <div id='app'>
          <header>OMDb Movie Tracker</header>
          <nav>
            <Link 
              to='/'
              onClick={ () => this.forceUpdate() }
              className={ pathname === '/' ? 'active' : '' }
            >Search
            </Link>
            <Link 
              to='/favorites'
              onClick={ () => this.forceUpdate() }
              className={ pathname === '/favorites' ? 'active' : '' }
            >Favorites
            </Link>
          </nav>

          <Route exact path='/' render={() => (
            <SearchContainer 
              handleFavoriteButtonClicked={ 
                () => this.setState({ showAddFavoriteForm: true }) 
              }
            />
          )} />
          <Route exact path='/favorites' render={() => (
            <FavoritesContainer />
          )} />

          {
            (this.state.showAddFavoriteForm)
              ? <div>
                  <div 
                    className='overlay'
                    onClick={ this.hideForm }
                  >
                  </div>
                  <AddFavoriteForm />
                </div>
              : null
          }
          { 
            (this.state.flashMessage)
              ? <p className='flash'>{ this.state.flashMessage }</p>
              : null
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => (
  {
    saveFavorite: state.status.saveFavorite,
    saveError: state.status.saveFavoriteError,
    updateRating: state.status.updateRating,
    updateError: state.status.updateRatingError,
    deleteFavorite: state.status.deleteFavorite,
    deleteFavoriteError: state.status.deleteFavoriteError,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    resetSaveStatus() {
      dispatch(resetSaveFavoriteStatus())
    },
    resetUpdateStatus() {
      dispatch(resetUpdateRatingStatus())
    },
    resetDeleteStatus() {
      dispatch(resetDeleteFavoriteStatus())
    },
    getAllFavorites() {
      dispatch(getAll())
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);