// const initialState = {
//   "title": "Star Wars: Episode IV - A New Hope",
//   "year": "1977",
//   "plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
//   "poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
//   "imdbID": "tt0076759"
// }

const initialState = {
  "title": "Spider Man",
  "year": "1978–1979",
  "plot": "To fight against the evil Iron Cross Army, led by the space emperor Professor Monster, a daredevil motorcyclist transforms into the famous Marvel Superhero, with a racecar and giant ...",
  "poster": "https://m.media-amazon.com/images/M/MV5BM2EwYzA2YjMtNDdhYi00OTI1LWE2ODUtOWViODk4YjRjNzVmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  "imdbID": "tt0185116",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      state = {
        title: action.payload.Title,
        year: action.payload.Year,
        plot: action.payload.Plot,
        poster: action.payload.Poster,
        imdbID: action.payload.imdbID
      }
      break;
      
    default: return state;
  }
  return state;
}