module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUsersRatings = () => {
    const query = {
      text: 'SELECT users.id as user_id, username, ratings.id as rating_id, rating, comment FROM users INNER JOIN ratings ON users.id = ratings.user_id',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellers = () => {
    const query = {
      text: 'SELECT * FROM cleaners',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellersServices = () => {
    const query = {
      text: 'SELECT cleaners.*, services.id as services_id, services.name as service, services.price as price, typeofservice, deposit FROM cleaners FULL OUTER JOIN services ON cleaners.id = services.cleaner_id ',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUser = (username, email, latitude, longitude, password) => {
    const query = {
      text: 'INSERT INTO users(username, email, latitude, longitude, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [username, email, latitude, longitude, password]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addService = (name, price, typeofservice, deposit, cleaner_id) => {
    const query = {
      text: 'INSERT INTO services(name, price, typeofservice, deposit, cleaner_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [name, price, typeofservice, deposit, cleaner_id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateService = (name, price, typeofservice, deposit, cleaner_id, service_id) => {
    const query = {
      text: `UPDATE services SET name = $1, price = $2, typeofservice = $3, deposit = $4, cleaner_id = $5
      WHERE services.id = $6 RETURNING *`,
      values: [name, price, typeofservice, deposit, cleaner_id, service_id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const deleteService = (service_id) => {
    const query = {
      text: `DELETE FROM services WHERE services.id = $1 RETURNING *`,
      values: [service_id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addRating = (rating, comment, service_id, user_id) => {
    const query = {
      text: 'INSERT INTO ratings(rating, comment, service_id, user_id) VALUES($1, $2, $3, $4) RETURNING *',
      values: [rating, comment, service_id, user_id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: 'SELECT * FROM users WHERE users.email = $1',
      values: [email]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellerByEmail = (email) => {
    const query = {
      text: 'SELECT * FROM cleaners WHERE cleaners.email = $1',
      values: [email]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserById = (id) => {
    const query = {
      text: 'SELECT * FROM users WHERE users.id = $1',
      values: [id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellerById = (id) => {
    const query = {
      text: 'SELECT * FROM cleaners WHERE cleaners.id = $1',
      values: [id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getServiceId = (cleanerId, service) => {
    const query = {
      text: `SELECT services.id
        FROM services
        JOIN cleaners ON cleaners.id = services.cleaner_id 
        WHERE cleaners.id = $1 AND services.name = $2`,
      values: [cleanerId, service]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getServicesById = (id) => {
    const query = {
      text: `SELECT cleaners.*, services.id as services_id, services.name as service, services.price as price, typeofservice, deposit 
        FROM cleaners 
        FULL OUTER JOIN services ON cleaners.id = services.cleaner_id 
        WHERE cleaners.id = $1`,
      values: [id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addSeller = (username, email, description, address, latitude, longitude, pictureUrl, phone, password) => {
    const query = {
      text: 'INSERT INTO cleaners(username, email, description, address, latitude, longitude, picture_url, phone, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      values: [username, email, description, address, latitude, longitude, pictureUrl, phone, password]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellersServicesRatings = () => {
    const query = {
      text: `SELECT cleaners.*, services.id as services_id, services.name as service, services.price as price, typeofservice, deposit, rating, comment
      FROM cleaners 
      FULL OUTER JOIN services ON (cleaners.id = services.cleaner_id)
      FULL OUTER JOIN ratings ON (ratings.service_id = services.id)`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getRatings = () => {
    const query = {
      text: `SELECT cleaners.id as cleaner_id, services.id as services_id, services.name as service, rating, comment, users.username as username
      FROM cleaners 
      FULL OUTER JOIN services ON (cleaners.id = services.cleaner_id)
      FULL OUTER JOIN ratings ON (ratings.service_id = services.id)
      JOIN users ON (users.id = ratings.user_id)`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getRatingsById = (id) => {
    const query = {
      text: `SELECT cleaners.id as cleaner_id, services.id as services_id, services.name as service, rating, comment, users.username as username
      FROM cleaners 
      FULL OUTER JOIN services ON (cleaners.id = services.cleaner_id)
      FULL OUTER JOIN ratings ON (ratings.service_id = services.id)
      JOIN users ON (users.id = ratings.user_id)
      WHERE cleaners.id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUsersRatings,
    getSellersServices,
    getSellers,
    addUser,
    getUserByEmail,
    getUserById,
    getSellerByEmail,
    getSellerById,
    addSeller,
    getServicesById,
    getSellersServicesRatings,
    getRatings,
    addService,
    addRating,
    getServiceId,
    updateService,
    deleteService,
    getRatingsById
  };
};