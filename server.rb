require 'sinatra'
require 'sinatra/contrib'
require 'rack/contrib'
require 'docdsl'
require_relative 'db/favorite.rb'
require_relative 'omdb_client.rb'

register Sinatra::DocDsl
use Rack::PostBodyContentTypeParser

configure(:development) do
  require 'sinatra/reloader'
  also_reload 'db/favorite.rb'
  also_reload 'omdb_client.rb'  
  also_reload 'public/index.html'
end

before do
  @favorite = Favorite.new(logger)
end

after do
  @favorite.disconnect
end

get '/' do
  send_file 'public/index.html', type: :html
end

namespace '/api' do
  helpers do
    def extract_movie_params
      movie_params = [:title, :year, :plot, :poster, :imdbID, :rating, :comment]
      params.select { |key, _| movie_params.include?(key.to_sym) }
    end

    def to_favorite_object(movie)
      imdbID = movie['imdbID']
      movie.delete('imdbID')
      { imdbID => movie }
    end

    def absent?(value)
      value.nil? || value.strip.empty?
    end

    def to_movie_object(data)
      {
        'title' => data['Title'],
        'year' => data['Year'],
        'plot' => data['Plot'],
        'poster' => data['Poster'],
        'imdbID' => data['imdbID']
      }
    end
  end

  documentation 'Search for a movie by title' do
    param :title, "movie+title or movie%20title"
    response 'json. A movie object', {
      "title": "Spider Man",
      "year": "1978–1979",
      "plot": "To fight against the evil Iron Cross Army, led by the space emperor Professor Monster, a daredevil motorcyclist transforms into the famous Marvel Superhero, with a racecar and giant ...",
      "poster": "https://m.media-amazon.com/images/M/MV5BM2EwYzA2YjMtNDdhYi00OTI1LWE2ODUtOWViODk4YjRjNzVmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
      "imdbID": "tt0185116",
    }
    status 400, 'When title is blank'
    status 404, 'When movie is not found on OMDb'
    status 500, 'When server API key is invalid or server is having connection issues with OMDb'
    status 200, 'Successful response'
  end
  get '/search' do
    title = params['title']
    client = OmdbClient.new

    halt 400, 'title cannot be blank' if absent?(title)

    begin
      data = client.query(title)
      json to_movie_object(data)

    rescue MovieNotFound
      halt 404, "Movie not found on OMDb."

    rescue InvalidAPIKey, Faraday::ConnectionFailed
      halt 500, 'The server is experiencing issues communicating with OMDb.'
    end
  end

  documentation 'Retrieve all favorite movies' do
    response 'json. An object with imdbIDs as key and corresponding favorite movies as values', {
      'tt12345678': {
        "title": "Spider Man",
        "year": "1978",
        "endyear": "1979",
        "plot": "To fight against the evil...",
        "poster": "https://m.media-amazon.com/images/M/MV5BM2EwYzA2YjMtNDdhYi00OTI1LWE2ODUtOWViODk4YjRjNzVmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        "rating": "5",
        "comment": "Awesome movie!"
      },
      'tt23456789': { 'title': 'Avatar', 'year': '2009', '...': '...' }
    }
    status 200
  end
  get '/favorites' do
    json @favorite.all
  end


  documentation 'Save a movie into the favorites list' do
    payload 'Request payload has to be json', {
      'title': 'String (required) : At least one character long.',
      'year': 'String : Format yyyy or yyyy-yyyy. If format is yyyy-yyyy, save ending year in endyear column. Not saved if format is incorrect',
      'plot': 'String : Movie plot',
      'poster': 'String : poster image URL (if URL format is incorrect, save as NULL)',
      'imdbID': 'String : imdbID for the movie. Max is 10 characters',
      'rating': 'Number 0-5',
      'comment': 'String (required) : 1 - 128 characters'
    }
    response 'json. The newly saved favorite with imdbID as a key and other attributes as an object assigned to it.', { 'tt12345678': { title: 'Spider-Man', year: '1986', '...': '...' } }
    status 201, 'When the movie is saved as favorite'
    status 400, "When movie cannot be saved (due to incorrect attributes). Body: { errors: [(error messages)] }"
  end
  post '/favorites' do
    movie = extract_movie_params
    
    if @favorite.save!(movie)
      status 201
      json to_favorite_object(movie)
    else
      status 400
      json({ 
        errors: @favorite.errors, 
        message: 'Cannot save movie into favorites list.'
      })
    end
  end


  documentation 'Update a favorite movie rating.' do
    payload 'Request payload is a json with a single rating attribute',
    {
      rating: 'Number : between 0-5'
    }
    response 'JSON: the updated favorite movie'
    status 200, 'rating is updated'
    status 400, 'when rating cannot be updated or incorrect format in request payload. response: { error: ["Rating must be an integer between 0-5"] }'
    status 404, 'when movie with given IMDb ID is not found.'
  end
  patch '/favorites/:imdbID' do
    imdbID = params['imdbID']
    rating = params['rating']
    
    movie = @favorite.find_by_imdb_id(imdbID)
    not_found_message = "Favorite movie not found for IMDb ID '#{imdbID}'."
    halt 404, not_found_message if !movie

    if @favorite.update_rating!(imdbID, rating)
      status 200
      movie['rating'] = rating
      json to_favorite_object(movie)
    else
      halt 400, 'Cannot update rating. Rating must be a number in 0 to 5.'
    end
  end


  documentation 'Delete a movie from favorites list' do
    status 204, 'No body when delete is successful'
    status 404, 'When movie with given IMDb ID is not found'
  end
  delete '/favorites/:imdbID' do
    imdbID = params['imdbID']
    
    if @favorite.destroy!(imdbID)
      halt 204
    else
      halt 404, "Favorite movie not found for IMDb ID '#{imdbID}'."
    end
  end
end

doc_endpoint '/doc'