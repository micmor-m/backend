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
  //   text: 'SELECT users.id as user_id, name, email, posts.id as post FROM users INNER JOIN posts ON users.id = posts.user_id',
  // };
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
      text: 'SELECT cleaners.*, services.id as services_id, services.name as service, services.price as price, typeofservice, deposit FROM cleaners INNER JOIN services ON cleaners.id = services.cleaner_id ',
    };
  //   text: 'SELECT users.id as user_id, name, email, posts.id as post FROM users INNER JOIN posts ON users.id = posts.user_id',
  // };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUser = (username, email, latitude, longitude, password) => {
    const query = {
      text: 'INSERT INTO users(username, email, latitude, longitude, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values:[username, email, latitude, longitude, password]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
        text: 'SELECT * FROM users WHERE users.email = $1',
        values:[email]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellerByEmail = (email) => {
    const query = {
        text: 'SELECT * FROM cleaners WHERE cleaners.email = $1',
        values:[email]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserById = (id) => {
    const query = {
        text: 'SELECT * FROM users WHERE users.id = $1',
        values:[id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellerById = (id) => {
    const query = {
        text: 'SELECT * FROM cleaners WHERE cleaners.id = $1',
        values:[id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const  getServicesById = (id) => {
    const query = {
        text: 'SELECT cleaners.*, services.id as services_id, services.name as service, services.price as price, typeofservice, deposit FROM cleaners INNER JOIN services ON cleaners.id = services.cleaner_id WHERE cleaners.id = $1',
        values:[id]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addSeller = (username, email, description, address, latitude, longitude, picture_url, phone, password) => {
    const query = {
      text: 'INSERT INTO cleaners(username, email, description, address, latitude, longitude, picture_url, phone, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      values:[username, email, description, address, latitude, longitude, picture_url, phone, password]
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
    getServicesById
  };
};