MOVIE_ATTRS = %w[title year plot poster imdbID]

VALID_FAVORITE = {
  'title' => 'Avatar', 
  'year' => '2009', 
  'plot' => 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', 
  'poster' => 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg', 
  'imdbID' => 'tt0499549',
  'rating' => 5,
  'comment' => 'A short comment'
}

ANOTHER_VALID_FAVORITE = {
  'title' => 'Spider-Man: Homecoming',
  'year' => '2017',
  'plot' => 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.',
  'poster' => 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg',
  'imdbID' => 'tt2250912',
  'rating' => 3,
  'comment' => 'Another short comment'
}

INVALID_FAVORITE = {
  'title' => 'Avatar',
  'imdbID' => 'tt0499549'
}