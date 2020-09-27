
const express = require('express');
const router = express.Router();
const { getRatingsByUsers } = require('../helpers/dataHelpers');

//add more function as I create them to access the database
module.exports = ({ getUsers, getUsersRatings, getUserByEmail, addUser }) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get('/ratings', (req, res) => {
    console.log("get usersrating")
    getUsersRatings()
    //getPostsByUsers
    .then((usersRatings) => {
      console.log("usersRatings", usersRatings)
      //res.json(usersRatings)})
      // .then((usersRatings) => {
         const formattedRating = getRatingsByUsers(usersRatings);
         res.json(formattedRating);
       })
      .catch((err) => res.json({ error: err.message }));
  });

  router.post('/', (req, res) => {

    const {first_name, last_name, email, password} = req.body;

    getUserByEmail(email)
      .then(user => {

        if (user) {
          res.json({msg: 'Sorry, a user account with this email already exists'});
        } else {
          return addUser(first_name, last_name, email, password)
        }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({error: err.message}));

  })

  //REGISTER
  router.post('/register', (req, res) => {
    console.log("REQ BODY", req.body)
    const {name, email, lat, lng, password} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({msg: "Please enter all fields"});
    }

    getUserByEmail(email)

  
      .then(user => {
        console.log("user", user.length)
        if (user.length >= 1) {
          res.json({msg: 'Sorry, a user account with this email already exists'});
        } else {
          return addUser(name, email, lat, lng, password)
        }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({error: err.message}));

  })

  return router;
};
