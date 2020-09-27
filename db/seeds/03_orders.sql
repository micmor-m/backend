INSERT INTO
  orders(user_id, total,  time_ordered)
VALUES
  (1, 3456, NOW()::timestamp),
  (2, 7856, NOW()::timestamp),
  (3, 6956, NOW()::timestamp),
  (4, 10000, NOW()::timestamp),
  (1, 4500, NOW()::timestamp);