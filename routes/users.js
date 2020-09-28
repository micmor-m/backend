
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authUser = require('../middleWare/authUser')
const { getRatingsByUsers } = require('../helpers/dataHelpers');

const webToken = process.env.JWT_SECRET_KEY;

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

  //GET LOGIN ??????????????
  router.get('/login',authUser,(req, res) => {
    console.log("get login", req.user)
    getUsersById(req.user.id)
    .then((user) => {
      console.log("user", user)
      res.json(user);
       })
      .catch((err) => res.json({ error: err.message }));
  });

  //POST /
  // router.post('/', (req, res) => {
  //   const {first_name, last_name, email, password} = req.body;
  //   getUserByEmail(email)
  //     .then(user => {
  //       if (user) {
  //         res.json({msg: 'Sorry, a user account with this email already exists'});
  //       } else {
  //         return addUser(first_name, last_name, email, password)
  //       }
  //     })
  //     .then(newUser => res.json(newUser))
  //     .catch(err => res.json({error: err.message}));
  // })

  //POST REGISTER
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
          bcrypt.genSalt(1, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if(err) throw err;
              const newUser_password = hash;
              
              //return addUser(name, email, lat, lng, newUser_password)
              addUser(name, email, lat, lng, newUser_password)
              .then(newUser => {
                //res.json(newUser)
                console.log("NEW USER", newUser[0])
                //req.session.name = newUser[0].id;
                jwt.sign(
                  { id: newUser[0].id },
                  webToken, //This is the secret web token in the env variable
                  { expiresIn: 3600 }, // expires in 1 hour
                  (err, token) => {
                    if(err) throw "err from webToken", err;
        
                    res.json({
                      token,
                      user: {
                        id: newUser[0].id,
                        name: newUser[0].name,
                        email: newUser[0].email
                      }
                    });
        
                  }
                )
        
              })
            })
          })
        }
      })

      .catch(err => res.json({error: err.message}));
  })

    //POST LOGIN
    router.post('/login', (req, res) => {
      console.log("REQ BODY", req.body)
      const {email, password} = req.body;
      if(!email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
      }
      getUserByEmail(email)
        .then(user => {
          console.log("user", user)
          if (user.length < 1) {
            res.json({msg: "User Does not exists"});
          } else {
            // Validate password
            console.log("Password, ", password)
            console.log("user Password, ", user[0].password)
            bcrypt.compare(password, user[0].password)
            .then(isMatch => {
              if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials'})

              jwt.sign(
                { id: user[0].id },
                webToken, //This is the secret web token in the env variable
                { expiresIn: 3600 }, // expires in 1 hour
                (err, token) => {
                  if(err) throw "err from webToken login POST", err;

                  res.json({
                    token,
                    user: {
                      id: user[0].id,
                      username: user[0].name,
                      email: user[0].email
                    }
                  });

                })
            })
            .catch(err => res.json({error: err.message}));
          }
        })
        .catch(err => res.json({error: err.message}));
      })

  return router;
};
