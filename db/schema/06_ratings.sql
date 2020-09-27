DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
  comments  TEXT
);