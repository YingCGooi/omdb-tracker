require 'faraday'
require 'json'
require 'logger'
require 'dotenv'
require 'pry'
require 'time'
Dotenv.load

class MovieNotFound < StandardError; end
class InvalidAPIKey < StandardError; end

class OmdbClient
  @@cache = {} # use memcached or Redis in production

  def initialize(http_client=Faraday.new)
    @http_client = http_client
    @logger = Logger.new(STDOUT)
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

    data = parse_json(response)
    cache_response(url, response)
    check_status(data, response.status)    

    data
  end

  def parse_json(response)
    JSON.load(response.body)
  end

  def get_response(url)
    cached_response = @@cache[url]

    return cached_response if cached_response && fresh?(cached_response)
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
      raise MovieNotFound, data['Error'] 
    end
  end

  def cache_response(url, response)
    @@cache[url] = response if cacheable?(response.env)
  end

  def cacheable?(env)
    cache_control_header = env.response_headers['Cache-Control']

    env.method == :get && 
    cache_control_header &&
    !cache_control_header.include?('no-store')
  end

  def fresh?(cached_response)
    age = response_age(cached_response)
    max_age = response_max_age(cached_response)

    return false unless (age && max_age)
    age <= max_age
  end

  def response_age(cached_response)
    date = cached_response.headers['Date']
    return if date.nil?
    time = Time.httpdate(date)
    (Time.now - time).floor
  end

  def response_max_age(cached_response)
    cache_control = cached_response.headers['Cache-Control']
    return if cache_control.nil?
    cache_control
      .match(/max-age=(\d+)/)[1]
      .to_i
  end
end
