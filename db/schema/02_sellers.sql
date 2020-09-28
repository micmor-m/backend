DROP TABLE IF EXISTS cleaners CASCADE;

CREATE TABLE cleaners (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255),
  latitude REAL,
  longitude REAL,
  picture_url TEXT,
  phone VARCHAR(255),
  password VARCHAR(255) NOT NULL
);