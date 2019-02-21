import React from 'react';
import { connect } from 'react-redux';

import SearchContainer from './SearchContainer';
import FavoritesContainer from './FavoritesContainer';
import AddFavoriteForm from './AddFavoriteForm';
import { resetSaveFavoriteStatus, getAll } from '../actions/favoritesActions';

class App extends React.Component {
  state = {
    showFavorites: false,
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
    if (this.props.saveStatus === 'SUCCESS') {

      this.renderFlashMessage('Movie has been saved to favorites list!');
      this.hideForm();

    } else if (this.props.saveStatus === 'ERROR') {
      this.renderSaveError();
    }
    this.props.resetSaveStatus();
  }

  renderSaveError = () => {
    const errorObj = this.props.saveError;
    const message = 
      errorObj.errors.join(',') + " - " + errorObj.message;
    this.renderFlashMessage(message);
  }

  renderFlashMessage = (message) => {
    this.setState({ flashMessage: message });
    setTimeout(() => {
      this.setState({ flashMessage: '' });
    }, 2000)
  }
 
  render() {
    return (
      <div id='app'>
        <header>OMDb Movie Tracker</header>
        <nav>
          <a 
            href='#'
            onClick={() => this.setState({ showFavorites: false })}
            className={ !this.state.showFavorites ? 'active' : '' }
          >Search
          </a>
          <a 
            href='#'
            onClick={() => this.setState({ showFavorites: true })}
            className={ this.state.showFavorites ? 'active' : '' }
          >Favorites
          </a>
        </nav>
        {
          (this.state.showFavorites)
            ? <FavoritesContainer />
            : <SearchContainer 
                handleFavoriteButtonClicked={ 
                  () => this.setState({ showAddFavoriteForm: true }) 
                }
              />
        }
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
    )
  }
}

const mapStateToProps = (state) => (
  {
    saveStatus: state.status.saveFavorite,
    saveError: state.status.saveFavoriteError,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    resetSaveStatus() {
      dispatch(resetSaveFavoriteStatus())
    },
    getAllFavorites() {
      dispatch(getAll())
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);