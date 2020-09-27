-- Users table seeds here
-- the password for all users is 'test'
INSERT INTO
  sellers(name, description, address, lat, lng, phone, password)
VALUES
  ('The Cleaner', 'clean cars and trucks', '11 Front St, Toronto', 44.50, -73.50, '1234567891','test'),
  ('Clean and more', 'affordable and fast', '133 University Ave, Toronto',45.33, -73.20, '3334567891','test'),
  ('Princess Peach', 'all you need in one place', '124 Lake St, Montreal', 48.10, -73.10, '1234567834', 'test'),
  ('Princess Daisy', 'wash and service', '1 Parlament St, Ottowa',42.30, -73.30, '1234457891', 'test'),
  ('Donkey Kong', 'all cars service', '156 Hill St, Vancouver', 45.70, -73.40, '2234567891', 'test');
