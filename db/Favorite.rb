require 'pg'
require 'pry'

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

  def save!(movie)
    movie = movie.dup
    format_years!(movie)
    @errors = errors_for_movie(movie)
    return false if @errors

    @errors = []
    db_insert_row!(movie)
  end

  def db_insert_row!(movie)
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
    favorites = {}
    sql = 'SELECT * FROM favorites'
    result = query(sql)

    result.each do |tuple|
      favorites[tuple['imdbid']] = to_movie_hash(tuple)
    end

    favorites
  end

  def find_by_imdb_id(imdbID)
    return false if !valid_imdb_id?(imdbID)

    sql = 'SELECT * FROM favorites WHERE imdbid = $1'
    result = query(sql, imdbID)
    result = result.to_a

    return false if result.empty?
    to_movie_hash(result[0])
  end

  def update_rating!(imdbID, rating)
    return false if !valid_rating?(rating)

    sql = 'UPDATE favorites SET rating = $1 WHERE imdbid = $2'
    query(sql, rating, imdbID)
  end

  def destroy!(imdbID)
    return false if !valid_imdb_id?(imdbID)

    sql = 'DELETE from favorites WHERE imdbid = $1'
    result = query(sql, imdbID)

    result.cmd_tuples == 1
  end

  private

  def bind_params(columns)
    columns.map
           .with_index(1) { |_, i| "$#{i}" }
           .join(', ')
  end

  def format_years!(movie)
    return if movie['year'].nil?
    years = movie['year'].split(/–|-/)
    movie['year'] = years[0]
    movie['endyear'] = years[1] if years[1]
  end

  def restore_year_range!(tuple)
    tuple['year'] += "–#{tuple['endyear']}"
  end

  def to_movie_hash(tuple)
    restore_year_range!(tuple) if tuple['endyear']

    {
      'title' => tuple['title'],
      'imdbID' => tuple['imdbid'],
      'year' => tuple['year'],
      'plot' => tuple['plot'],
      'poster' => tuple['poster'],
      'rating' => tuple['rating'].to_i,
      'comment' => tuple['comment']
    }
  end

  def query(statement, *params)
    @logger.info "\u001b[33;1m#{statement}: \u001b[32m#{params} \u001b[0m"
    @db.exec_params(statement, params)
  end

  def title_present?(title)
    title && !title.strip.empty?
  end

  def valid_year?(year)
    year && year.match(/^\d{4}$/)
  end

  def valid_end_year?(end_year)
    return end_year.match(/^\d{4}$/) if end_year
    true
  end

  def valid_rating?(rating)
    rating && (0..5).include?(rating)
  end

  def valid_imdb_id?(imdbID)
    imdbID && imdbID.length.between?(9, 10)
  end

  def valid_comment?(comment)
    comment && comment.length <= 128 && !comment.strip.empty?
  end

  def valid_poster?(poster)
    poster && (poster == 'N/A' || poster.match(/^https?:\/\//))
  end

  def errors_for_movie(m)
    validations = {
      'Movie must have a title': title_present?(m['title']),
      'Movie must have a valid year': valid_year?(m['year']),
      'Movie must have a valid ending year': valid_end_year?(m['endyear']),
      'Movie must have a rating of 0-5': valid_rating?(m['rating']),
      'Movie must have a poster image URL or "N/A"': valid_poster?(m['poster']),
      'Movie must have a valid IMDB ID': valid_imdb_id?(m['imdbID']),
      'Movie must have a short comment (<=128 chars)': valid_comment?(m['comment'])
    }

    errors = validations.select { |_, condition| !condition }
    return errors.keys if !errors.empty?
    false
  end  
end