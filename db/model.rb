require 'pg'

class Favorite
  DB_NAME = 'omdb_tracker'
  TABLE_NAME = 'favorites'

  attr_reader :errors

  def initialize(logger)
    @db = if Sinatra::Base.production?
            PG.connect(ENV['DATABASE_URL'])
          else
            PG.connect(dbname: DB_NAME)
          end
    @logger = logger
    @errors = []
  end

  def disconnect
    @db.close
  end

  def save(movie)
    @errors = errors_for_movie(movie)
    return false if @errors

    @errors = []
    columns = movie.keys
    values = movie.values

    sql = "INSERT INTO favorites (#{columns.join(', ')}) VALUES (#{bind_params(columns)})"

    begin
      query(sql, *values)
    rescue PG::UniqueViolation
      @errors = ['Movie already exists in favorites']
      return false
    end
  end

  def all
    
  end

  private

  def bind_params(columns)
    columns.map.with_index(1) { |_, i| "$#{i}" }
           .join(', ')
  end

  def errors_for_movie(m)
    errors = {
      'Movie must have a title': m['title'].strip.empty?,
      'Movie must have a valid year': !m['year'].match(/^\d{4}$/),
      'Movie must have a valid ending year': m['endYear'] && !m['endYear'].match(/^\d{4}$/),
      'Movie must have a rating of 0-5': !(0..5).include?(m['rating']),
      'Movie must have a valid IMDB ID': !m['imdbID'].length.between?(9, 10),
      'Movie must have a comment': m['comment'].nil? || m['comment'].strip.empty?,
      'Comment must not exceed 128 characters': m['comment'] && m['comment'].length > 128
    }

    errors = errors.select { |_, condition| condition }
    return errors.keys if !errors.empty?
    return false
  end

  def query(statement, *params)
    @logger.info "#{statement}: #{params}"
    @db.exec_params(statement, params)
  end
end