
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authUser = require('../middleWare/authUser')
const { getServicesBySellers } = require('../helpers/dataHelpers');

const webToken = process.env.JWT_SECRET_KEY;

//add more function as I create them to access the database
module.exports = ({ getSellers,  getSellersServices, getSellerByEmail, addSeller, getSellerById }) => {
  console.log('This is from GET cleaners')
  /* GET users listing. */
  router.get('/', (req, res) => {
    //console.log("REQ from get cleaners /", req)
    getSellers()
      .then((sellers) => res.json(sellers))
      .catch((err) => res.json({ error: err.message }));
  });

  //GET LOGIN
  router.get('/login', authUser, (req, res) => {
    console.log("get login", req.user)
    getSellerById(req.user.id)
      .then((seller) => {
        console.log("seller", seller)
        res.json(seller);
      })
      .catch((err) => res.json({ error: err.message }));
  });

    //POST REGISTER
    router.post('/register', (req, res) => {
      console.log("REQ BODY", req.body)
      const {username, email, description, address, latitude, longitude, picture_url, phone, password} = req.body;
      if(!username || !email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
      }
      getSellerByEmail(email)
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
                addSeller(username, email, description, address, latitude, longitude, picture_url, phone, newUser_password)
                .then(newUser => {
                  //res.json(newUser)
                  //console.log("NEW USER", newUser[0])
                  //req.session.name = newUser[0].id;
                  if (newUser[0] === undefined) {
                    console.log("Something went frong while register a new cleaner!")
                    res.status(400).json({msg: 'Sorry, something went wrong user not saved. Try again'});
                  } else {
                  jwt.sign(
                    { id: newUser[0].id },
                    webToken, //This is the secret web token in the env variable
                    { expiresIn: 3600 }, // expires in 1 hour
                    (err, token) => {
                      if(err) throw "err from webToken", err;

                      res.json({
                        token,
                        cleaner: {
                          id: newUser[0].id,
                          username: newUser[0].username,
                          email: newUser[0].email,
                          description: newUser[0].description,
                          address: newUser[0].address,
                          latitude: newUser[0].latitude,
                          longitude: newUser[0].longitude,
                          picture_url: newUser[0].picture_url,
                          phone: newUser[0].phone,
                        }
                      });
          
                    }
                  )
                  }
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
    getSellerByEmail(email)
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
                  cleaner: {
                    id: user[0].id,
                    username: user[0].username,
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
  
  router.get('/services', (req, res) => {
    console.log("get sellers services")
    getSellersServices()
    //getPostsByUsers
    .then((services) => {
      console.log("servicies", services)
      //res.json(usersRatings)})
      // .then((usersRatings) => {
         const formattedServices = getServicesBySellers(services);
         res.json(formattedServices);
       })
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
