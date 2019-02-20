CREATE TABLE favorites (
    id serial PRIMARY KEY,
    imdbid varchar(10) NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    year numeric(4),
    endyear numeric(4),
    plot text,
    poster varchar(512) NOT NULL,
    rating numeric(1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    comment varchar(128) NOT NULL
);