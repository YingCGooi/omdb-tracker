## Alpha Take Home Assignment - OMDb Movie Tracker

## Installation
Make sure to have PostgreSQL installed and running properly in your machine. Also, make sure that you have Ruby 2.4.1 installed and running locally.

1. Navigate to the root directory of the project.

2. Create a new database named 'omdb_tracker':

```
createdb omdb_tracker
```

3. Import the sql schema to the database.

```
psql omdb_tracker < db/schema.sql
```

4. Install dependencies by running:

```
bundle install
```

Note: you need to have bundler installed

5. Once all gem dependencies have been satisfied, run:

```
bundle exec ruby server.rb
```

This will start the Sinatra server at `localhost:4567`

6. Navigate to `localhost:4567` in your browser to access the application.
