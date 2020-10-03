-- Users table seeds here
-- the password for all users is 'test'
INSERT INTO
  cleaners(username, email, description, address, latitude, longitude, picture_url, phone, password)
VALUES
  ('Luigi', 'cleaner@a.com','clean cars and trucks', '11 Front St, Toronto', 44.50, -73.50, 'https://www.pikpng.com/pngl/m/52-526874_luigi-bros-png-luigi-de-mario-bross-clipart.png', '1234567891','test'),
  ('Mario', 'clean&more@a.com','affordable and fast', '133 University Ave, Toronto', 45.33, -73.20, 'https://www.pikpng.com/pngl/m/30-307327_mario-png-mario-mario-party-9-clipart.png','3334567891','test'),
  ('Princess Peach', 'queen@a.com','all you need in one place', '124 Lake St, Montreal', 48.10, -73.10, 'https://www.pikpng.com/pngl/m/472-4723258_daisy-and-peach-mario-bros-daisy-saxi-clipart.png', '1234567834', 'test'),
  ('Princess Daisy', 'king@a.com', 'wash and service', '1 Parlament St, Ottowa',42.30, -73.30, 'https://www.pikpng.com/pngl/m/244-2443348_super-princess-peach-mario-bros-princess-peach-coloring.png', '1234457891', 'test'),
  ('Donkey Kong', 'donkey@a.com','all cars service', '156 Hill St, Vancouver', 45.70, -73.40, 'https://www.pikpng.com/pngl/m/167-1671773_transparent-donkey-kong-donkey-kong-png-transparent-clipart.png', '2234567891', 'test');
