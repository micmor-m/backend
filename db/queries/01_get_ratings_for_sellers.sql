SELECT users.username as user, rating, comment, services.name as service_name, typeofservice, cleaners.username 
FROM cleaners 
INNER JOIN services ON cleaners.id = services.cleaner_id
INNER JOIN ratings ON ratings.service_id = services.id
INNER JOIN users ON ratings.user_id = users.id

SELECT cleaners.*, services.id as services_id, services.name as service, services.price as price, typeofservice, deposit, rating, comment
FROM cleaners 
INNER JOIN services ON (cleaners.id = services.cleaner_id)
FULL OUTER JOIN ratings ON (ratings.service_id = services.id)