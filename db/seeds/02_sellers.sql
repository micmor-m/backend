-- Users table seeds here
-- the password for all users is 'test'
INSERT INTO
  users(name, description, address, lat, lng, phone, password)
VALUES
  ('The Cleaner', 'clean cars and trucks', '11 Front St, Toronto', 44.50, -73.50, '1234567891','test'),
  ('Clean and more', 'affordable and fast', 45.33, -73.20, '3334567891','test'),
  ('Princess Peach', 'all you need in one place', 48.10, -73.10, '1234567834', 'test'),
  ('Princess Daisy', 'wash and service', 42.30, -73.30, '1234457891', 'test'),
  ('Donkey Kong', 'all cars service', 45.70, -73.40, '2234567891', 'test');
