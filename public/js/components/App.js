import React from 'react';
import SearchContainer from './SearchContainer';
import FavoritesContainer from './FavoritesContainer';
import AddFavoriteForm from './AddFavoriteForm';

class App extends React.Component {
  state = {
    showFavorites: false,
    showAddFavoriteForm: false,
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
                  onClick={ () => this.setState({ showAddFavoriteForm: false }) }
                >
                </div>
                <AddFavoriteForm />
              </div>
            : null
        }
      </div>
    )
  }
}

export default App;