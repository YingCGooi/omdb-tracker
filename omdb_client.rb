require 'faraday'
require 'json'
require 'logger'
require 'dotenv'
Dotenv.load

class MovieTitleNotFound < StandardError; end
class InvalidAPIKey < StandardError; end

class OmdbClient
  attr_reader :cache

  def initialize(http_client=Faraday.new)
    @http_client = http_client
    @logger = Logger.new(STDOUT)
    @cache = {}
  end

  def query(title)
    url = "http://www.omdbapi.com/?apikey=#{ENV['API_KEY']}&t=#{title}"
    call(url)
  end

  private

  def call(url)
    start_time = Time.now

    response = get_response(url)
    log_request(url, response.status, start_time)

    data = JSON.load(response.body)
    check_status(data, response.status)
    cache_response(url, response)

    data
  end

  def get_response(url)
    if @cache[url]
      return @cache[url]
    end
    @http_client.get(url)
  end

  def log_request(url, status, start_time)
    duration = Time.now - start_time
    @logger.debug "#{url} GET #{status} #{duration}\n"
  end

  def check_status(data, status)
    if status == 401
      raise InvalidAPIKey, data['Error']
    end 

    if status == 200 && data['Response'] == 'False'
      raise MovieTitleNotFound, data['Error'] 
    end
  end

  def cache_response(url, response)
    @cache[url] = response
  end
end

client = OmdbClient.new
puts client.query('avatar')
puts client.cache
