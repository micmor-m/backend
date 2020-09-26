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

  const getUsersPosts = () => {
    const query = {
      text: 'SELECT users.id as user_id, first_name, last_name, email, posts.id as post FROM users INNER JOIN posts ON users.id = posts.user_id',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUsersPosts
  };
};