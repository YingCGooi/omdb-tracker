 ENV['RACK_ENV'] = 'test'
ENV['TEST_DATABASE'] = 'omdb_tracker_test'

require 'minitest/autorun'
require 'minitest/reporters'
require 'rack/test'
require 'json'
require_relative '../server.rb'
require_relative '../db/favorite.rb'
require_relative 'test_constants.rb'

Minitest::Reporters.use!

class APITest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def setup
    @favorite = Favorite.new(Logger)
  end

  def teardown
    @favorite.destroy_all!
  end

  def test_index
    get '/'
    assert_equal 200, last_response.status
    assert_match /text\/html/, last_response['Content-Type']
  end

  def test_favorites_path
    get '/favorites'
    assert_equal 200, last_response.status
    assert_match /text\/html/, last_response['Content-Type']
  end

  # GET /api/search
  # For now, each test sends a network request to the OMDb API.
  # In future, we can use a mocked API client to improve performance of testing.
  def test_search_returns_movie_as_json
    get '/api/search?title=avatar'
    assert_equal 200, last_response.status

    json = JSON.parse(last_response.body)
    assert MOVIE_ATTRS.all? { |attr| json[attr].length > 0 }
  end

  def test_search_returns_error_with_non_existing_title
    get '/api/search?title=abc1234567890'
    assert_equal 404, last_response.status
    assert_equal 'Movie not found!', last_response.body
  end

  def test_does_not_search_with_empty_title
    get '/api/search?title='
    assert_equal 400, last_response.status
    assert_equal 'Title cannot be blank!', last_response.body
  end

  # GET /api/favorites
  def test_responds_with_all_saved_movies_as_json
    @favorite.save!(VALID_FAVORITE)
    @favorite.save!(ANOTHER_VALID_FAVORITE)

    get '/api/favorites'
    assert_equal 200, last_response.status
    json = JSON.parse(last_response.body)
    assert_equal 2, json.size
  end

  # POST /api/favorites
  def test_saves_a_valid_movie_into_favorites
    post '/api/favorites', VALID_FAVORITE
    assert_equal 201, last_response.status
    assert_equal 1, @favorite.all.size
  end

  def test_does_not_save_an_invalid_movie
    post '/api/favorites', INVALID_FAVORITE
    assert_equal 400, last_response.status

    json = JSON.parse(last_response.body)
    assert_equal 'Cannot save movie into favorites list.', json['message']
    assert_equal 0, @favorite.all.size
  end

  # PATCH /api/favorites/:imdbID
  def test_updates_a_favorite_with_a_valid_rating
    @favorite.save!(VALID_FAVORITE)
    assert_equal 5, VALID_FAVORITE['rating']    
    imdbID = VALID_FAVORITE['imdbID']

    patch '/api/favorites/' + imdbID, { rating: 2 }
    assert_equal 200, last_response.status

    updated_favorite = @favorite.find_by_imdb_id(imdbID)
    assert_equal 2, updated_favorite['rating']
  end

  def test_does_not_update_with_non_existing_imdb_id
    @favorite.save!(VALID_FAVORITE)

    patch '/api/favorites/ab1234567', { rating: 2 }
    assert_equal 404, last_response.status
    assert_equal "Favorite movie not found for IMDb ID 'ab1234567'.", last_response.body
  end

  def test_does_not_update_with_invalid_rating
    @favorite.save!(VALID_FAVORITE)
    imdbID = VALID_FAVORITE['imdbID']

    patch '/api/favorites/' + imdbID, { rating: -1 }
    assert_equal 400, last_response.status
    assert_match /Cannot update rating/, last_response.body
  end

  # DELETE /api/favorites/:imdbID
  def test_deletes_a_favorite_with_existing_imdb_id
    @favorite.save!(VALID_FAVORITE)
    @favorite.save!(ANOTHER_VALID_FAVORITE)
    imdbID = VALID_FAVORITE['imdbID']
    another_imdbID = ANOTHER_VALID_FAVORITE['imdbID']

    delete '/api/favorites/' + imdbID
    all_favorites = @favorite.all

    assert_equal 204, last_response.status
    assert_equal 1, all_favorites.size
    refute all_favorites.include?(imdbID)
    assert all_favorites.include?(another_imdbID)
  end

  def test_does_not_delete_with_non_existing_imdb_id
    @favorite.save!(VALID_FAVORITE)
    @favorite.save!(ANOTHER_VALID_FAVORITE)

    delete '/api/favorites/ab1234567'
    assert_equal 404, last_response.status
    assert_equal "Favorite movie not found for IMDb ID 'ab1234567'.", last_response.body
    assert_equal 2, @favorite.all.size
  end
end

class Logger
  def self.info(string)
    # placeholder method for logging in Favorite object
  end
end