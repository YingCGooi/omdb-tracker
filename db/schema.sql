CREATE TABLE favorites (
    id serial PRIMARY KEY,
    imdbID varchar(10) NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    year numeric(4) NOT NULL,
    poster varchar(512),
    rating numeric(1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    comment varchar(128) NOT NULL
);