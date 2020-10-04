
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authUser = require('../middleWare/authUser');
const { getRatingsByUsers } = require('../helpers/dataHelpers');

const webToken = process.env.JWT_SECRET_KEY;

//add more function as I create them to access the database
module.exports = ({ getUsers, getUsersRatings, getUserByEmail, addUser, addRating, getUserById, getServiceId }) => {

  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get('/ratings', (req, res) => {
    getUsersRatings()
      .then((usersRatings) => {
        const formattedRating = getRatingsByUsers(usersRatings);
        res.json(formattedRating);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  //GET LOGIN
  router.get('/login', authUser, (req, res) => {
    getUserById(req.user.id)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  //POST REGISTER
  router.post('/register', (req, res) => {
    console.log("REQ BODY", req.body);
    const { username, email, latitude, longitude, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    getUserByEmail(email)
      .then(user => {
        console.log("user", user.length);
        if (user.length >= 1) {
          res.json({ msg: 'Sorry, a user account with this email already exists' });
        } else {
          bcrypt.genSalt(1, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              const newUser_password = hash;

              //return addUser(name, email, lat, lng, newUser_password)
              addUser(username, email, latitude, longitude, newUser_password)
                .then(newUser => {
                  jwt.sign(
                    { id: newUser[0].id },
                    webToken, //This is the secret web token in the env variable
                    //{ expiresIn: 3600 }, // expires in 1 hour
                    (err, token) => {
                      if (err) throw "err from webToken", err;

                      res.json({
                        token,
                        user: {
                          id: newUser[0].id,
                          username: newUser[0].username,
                          email: newUser[0].email
                        }
                      });
                    }
                  );
                });
            });
          });
        }
      })
      .catch(err => res.json({ error: err.message }));
  });

  //POST LOGIN
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    getUserByEmail(email)
      .then(user => {
        if (user.length < 1) {
          res.json({ msg: "User Does not exists" });
        } else {
          // Validate password
          bcrypt.compare(password, user[0].password)
            .then(isMatch => {
              if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

              jwt.sign(
                { id: user[0].id },
                webToken, //This is the secret web token in the env variable
                //{ expiresIn: 3600 }, // expires in 1 hour
                (err, token) => {
                  if (err) throw "err from webToken login POST", err;

                  res.json({
                    token,
                    user: {
                      id: user[0].id,
                      username: user[0].username,
                      email: user[0].email
                    }
                  });

                });
            })
            .catch(err => res.json({ error: err.message }));
        }
      })
      .catch(err => res.json({ error: err.message }));
  });

  //POST RATING
  router.post('/rating', (req, res) => {
    console.log("REQ BODY", req.body);

    let { rating, comment, service, cleanerId } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //to get user Id from token
    const token = req.headers.userttoken;
    const decoded = jwt.verify(token, webToken);
    const userIdDecoded = decoded.id;
    console.log("user token", userIdDecoded)

    console.log(" cleanerId", cleanerId)
    console.log(" service", service)
    getServiceId(cleanerId, service)
      .then(serviceId => {
        console.log("serviceId", serviceId[0].id)
        addRating(rating, comment, serviceId[0].id, userIdDecoded)
          .then(newRating => {
            if (newRating[0] === undefined) {
              console.log("Something went frong while register a new rating!");
              res.status(400).json({ msg: 'Sorry, something went wrong rating not saved. Try again' });
            } else {
              res.json({
                rating: {
                  id: newRating[0].id,
                  rating: newRating[0].rating,
                  comment: newRating[0].comment,
                  service_id: newRating[0].service_id,
                  user_id: newRating[0].user_id
                }
              });
            }
          })
          .catch(err => res.json({ error: err.message }));
      })
  });

  return router;
};
