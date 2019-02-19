require 'sinatra'
require_relative 'db/favorites.rb'

configure(:development) do
  require 'sinatra/reloader'
  also_reload 'database_persistence.rb'
  also_reload 'public/index.html'
end

get '/' do
  send_file 'public/index.html', type: :html
end