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
      text: 'SELECT users.id as user_id, name, ratings.id as rating_id, ratings, comments FROM users INNER JOIN ratings ON users.id = ratings.user_id',
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
      text: 'SELECT * FROM sellers',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSellersServices = () => {
    const query = {
      text: 'SELECT sellers.id, sellers.name, services.id as services_id, services.name as service, services.price as price, typeofservice FROM sellers INNER JOIN services ON sellers.id = services.seller_id',
    };
  //   text: 'SELECT users.id as user_id, name, email, posts.id as post FROM users INNER JOIN posts ON users.id = posts.user_id',
  // };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUser = (name, email, lat, lng, password) => {
    const query = {
      text: 'INSERT INTO users(name, email, lat, lng, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values:[name, email, lat, lng, password]
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

  return {
    getUsers,
    getUsersRatings,
    getSellersServices,
    getSellers,
    addUser,
    getUserByEmail
  };
};