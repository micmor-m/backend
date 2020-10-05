-- Users table seeds here
-- the password for all users is 'test'
INSERT INTO
  cleaners(username, email, description, address, latitude, longitude, picture_url, phone, password)
VALUES
  ('Luigi', 'luigi@gmail.com','Clean cars and trucks.', '11 Front St, Toronto', 43.642824, -79.393661, 'https://www.pikpng.com/pngl/m/52-526874_luigi-bros-png-luigi-de-mario-bross-clipart.png', '1234567891','test'),
  ('Mario', 'mario@gmail.com.com','Affordable, reliable and fast.', '133 University Ave, Toronto', 43.654671, -79.388410, 'https://www.pikpng.com/pngl/m/30-307327_mario-png-mario-mario-party-9-clipart.png','3334567891','test'),
  ('Princess Peach', 'peach@gmail.com','All cleaning services you need.', '124 Lake St, Montreal', 45.445253,  -73.741037, 'https://www.pikpng.com/pngl/m/472-4723258_daisy-and-peach-mario-bros-daisy-saxi-clipart.png', '1234567834', 'test'),
  ('Princess Daisy', 'daisy@gmail.com', 'Wash and more servicees.', '1 Parlament St, Toronto',43.659533, -79.365630, 'https://www.pikpng.com/pngl/m/244-2443348_super-princess-peach-mario-bros-princess-peach-coloring.png', '1234457891', 'test'),
  ('Donkey Kong', 'donkey@gmail.com','Master gardening.', '156 Hill St, Toronto', 43.855280, -79.438985, 'https://www.pikpng.com/pngl/m/167-1671773_transparent-donkey-kong-donkey-kong-png-transparent-clipart.png', '2234567891', 'test');
