require 'sinatra'
require 'sinatra/contrib'
require 'rack/contrib'
require 'docdsl'
require_relative 'db/model.rb'

register Sinatra::DocDsl
use Rack::PostBodyContentTypeParser

configure(:development) do
  require 'sinatra/reloader'
  also_reload 'db/model.rb'
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

    def to_favorite_hash(movie)
      imdbID = movie['imdbID']
      movie.delete('imdbID')
      { imdbID => movie }
    end
  end

  documentation 'Retrieve all favorite movies'
  get '/favorites' do
    json @favorite.all
  end


  documentation 'Saves a movie as favorite' do
    payload 'Request payload has to be json', {
      'title': 'String (required) : At least one character long.',
      'year': 'String : Format yyyy or yyyy-yyyy. If format is yyyy-yyyy, save ending year in endyear column. Not saved if format is incorrect',
      'plot': 'String : Movie plot',
      'poster': 'String : poster image URL (if URL format is incorrect, save as NULL)',
      'imdbID': 'String : imdbID for the movie. Max is 10 characters',
      'rating': 'Number 0-5',
      'comment': 'String (required) : 1 - 128 characters'
    }
    response 'json. The newly saved favorite with imdbID as a key and other attributes as an object assigned to it.', { 'tt12345678': { movie_attrs: '...' } }
    status 201, 'When the movie is saved as favorite'
    status 400, "When movie cannot be saved (due to incorrect attributes). Body: { errors: [(error messages)] }"
  end
  post '/favorites' do
    movie = extract_movie_params
    
    if @favorite.save!(movie)
      status 201
      json(to_favorite_hash(movie))
    else
      status 400
      json({ errors: @favorite.errors })
    end
  end
end

doc_endpoint '/doc'