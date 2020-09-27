
DROP TABLE IF EXISTS services CASCADE;

CREATE TABLE services (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER  NOT NULL DEFAULT 0,
  picture_url TEXT NOT NULL,
  typeodservice VARCHAR(255) NOT NULL,
  seller_id INTEGER REFERENCES seller(id) ON DELETE CASCADE
);