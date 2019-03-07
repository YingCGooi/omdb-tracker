# OMDb Movie Tracker

## Demo
To skip installation and view the app, navigate to https://omdb-tracker.herokuapp.com/.

## Local Installation
Make sure to have PostgreSQL installed and running properly in your machine. Also, make sure that you have Ruby 2.4.1 installed and running locally.

1. Navigate to the root directory of the project.

2. Create a new database named `omdb_tracker`:

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

## Testing
Make sure that you complete the local installation.

1. Create a test database named `omdb_tracker_test`
```
createdb omdb_tracker_test
```

2. Import the sql schema to the test database
```
psql omdb_tracker_test < db/schema.sql
```

3. Run all tests
```
bundle exec ruby test/api_test.rb
```

## Additional Notes
### Stack
- Sinatra as backend API server
- Postgres as RDBMS, connected via `pg` gem
- React/Redux as frontend, bundled using Webpack
- Raw CSS with icons from semantic-ui

### OMDb API Client
An API wrapper client is built to handle logging, status checking, and server-side caching. Currently, the API client uses a Ruby Hash to cache responses. In a production setting, Redis or Memcached can be used instead to preserve cached data in case of a server crash.

### Backend Validation
The application's model layer (represented by the `Favorite` class in `db/favorite.rb`) performs appropriate validations before querying the Postgres database. For validating unique values, we rely on Postgres to take advantage of index search for the unique column.

### Favorites List Object
The object for favorites list has this format:

```go
const favoritesList = {
  imdbID1: {
    title: 'Star Wars',
    year: '1977',
    plot: 'Luke Skywalker...',
    poster: 'https://...',
    rating: '5',
    comment: 'An awesome movie...',
  },
  imdbID2: {
    title: 'Avatar',
    '...': '...',
  }
}
```

The advantage of using an object with imdbID as the key is that we can perform a lookup for a particular movie in O(1) time. This is efficient to determine whether or not a movie query result matches a movie in the favorites list.

### `endyear` column
When fetching data from OMDb, a movie's `year` value may contain a year range (for example: `1978–1979`).
To conform to the schema of a `year` column to contain only four-digit year numbers `YYYY`, it makes sense to create a separate column `endyear` to store the ending year. When forming a response, the ending year is recombined with the starting year.
