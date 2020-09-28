DROP TABLE IF EXISTS sellers CASCADE;

CREATE TABLE cleaners (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  latitude REAL  NOT NULL,
  longitude REAL  NOT NULL,
  picture_url TEXT,
  phone VARCHAR(255),
  password VARCHAR(255) NOT NULL
);