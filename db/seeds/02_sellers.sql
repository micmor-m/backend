-- Users table seeds here
-- the password for all users is 'test'
INSERT INTO
  cleaners(username, email, description, address, latitude, longitude, picture_url, phone, password)
VALUES
  ('The Cleaner', 'cleaner@a.com','clean cars and trucks', '11 Front St, Toronto', 44.50, -73.50, NULL, '1234567891','test'),
  ('Clean and more', 'clean&more@a.com','affordable and fast', '133 University Ave, Toronto', 45.33, -73.20, NULL,'3334567891','test'),
  ('Princess Peach', 'queen@a.com','all you need in one place', '124 Lake St, Montreal', 48.10, -73.10, NULL, '1234567834', 'test'),
  ('Princess Daisy', 'king@a.com', 'wash and service', '1 Parlament St, Ottowa',42.30, -73.30, NULL, '1234457891', 'test'),
  ('Donkey Kong', 'donkey@a.com','all cars service', '156 Hill St, Vancouver', 45.70, -73.40, NULL, '2234567891', 'test');
