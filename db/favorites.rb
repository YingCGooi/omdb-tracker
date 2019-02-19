require 'pg'

DB_NAME = 'omdb_tracker'
TABLE_NAME = 'favorites'

class Favorites
  def initialize(logger)
    @db = if Sinatra::Base.production?
            PG.connect(ENV['DATABASE_URL'])
          else
            PG.connect(dbname: DB_NAME)
          end
    @logger = logger
  end

  def disconnect
    @db.close
  end

  def all
    
  end

  private

  def query(statement, *params)
    @logger.info "#{statement}: #{params}"
    @db.exec_params(statement, params)
  end
end