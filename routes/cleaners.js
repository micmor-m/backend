
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authUser = require('../middleWare/authUser');
const { getServicesBySellers, getServicesBySeller, getServicesBySellersRatings, getRatingsByUsers } = require('../helpers/dataHelpers');

const webToken = process.env.JWT_SECRET_KEY;

//add more function as I create them to access the database
module.exports = ({ getSellers, getSellersServices, getSellerByEmail, addSeller, addService, getSellerById, getServicesById, getRatings, getSellersServicesRatings }) => {
  //console.log('This is from GET cleaners');
  /* GET users listing. */
  router.get('/', (req, res) => {
    //console.log("REQ from get cleaners /", req)
    getSellers()
      .then((sellers) => res.json(sellers))
      .catch((err) => res.json({ error: err.message }));
  });

  //GET LOGIN
  router.get('/login', authUser, (req, res) => {
    //console.log("get login", req.user);
    getSellerById(req.user.id)
      .then((seller) => {
        //console.log("seller", seller);
        res.json(seller);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  //POST REGISTER
  router.post('/register', (req, res) => {
    //console.log("REQ BODY", req.body);
    const { username, email, description, address, latitude, longitude, pictureUrl, phone, password } = req.body;
    if (!username || !email || !password) {
      console.log("Mandatory fields are empty");
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    getSellerByEmail(email)
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
              addSeller(username, email, description, address, latitude, longitude, pictureUrl, phone, newUser_password)
                .then(newUser => {
                  //res.json(newUser)
                  console.log("picture_url", pictureUrl)
                  //req.session.name = newUser[0].id;
                  if (newUser[0] === undefined) {
                    console.log("Something went frong while register a new cleaner!");
                    res.status(400).json({ msg: 'Sorry, something went wrong user not saved. Try again' });
                  } else {
                    jwt.sign(
                      { id: newUser[0].id },
                      webToken, //This is the secret web token in the env variable
                      { expiresIn: 3600 }, // expires in 1 hour
                      (err, token) => {
                        if (err) throw "err from webToken", err;

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
                            pictureUrl: newUser[0].picture_url,
                            phone: newUser[0].phone,
                          }
                        });

                      }
                    );
                  }
                });
            });
          });
        }
      })
      .catch(err => res.json({ error: err.message }));
  });


  //POST LOGIN
  router.post('/login', (req, res) => {
    console.log("REQ BODY", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    getSellerByEmail(email)
      .then(user => {
        //console.log("user", user);
        if (user.length < 1) {
          res.json({ msg: "User Does not exists" });
        } else {
          // Validate password
          //console.log("Password, ", password);
          //console.log("user Password, ", user[0].password);
          bcrypt.compare(password, user[0].password)
            .then(isMatch => {
              if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

              jwt.sign(
                { id: user[0].id },
                webToken, //This is the secret web token in the env variable
                //{ expiresIn: 36000 }, // expires in 1 hour
                (err, token) => {
                  if (err) throw "err from webToken login POST", err;

                  res.json({
                    token,
                    cleaner: {
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

  router.get('/cleaner_profile/:id', (req, res) => {
    //console.log("get sellers services");
    //console.log("req.params.id", req.params.id);

    getServicesById(req.params.id)
      //getPostsByUsers
      .then((services) => {
        //console.log("servicies by ID", services);
        //res.json(usersRatings)})
        // .then((usersRatings) => {
        const formattedServicesBySeller = getServicesBySeller(services);
        //console.log("ServiceSELLER:", formattedServicesBySeller);
        res.json(formattedServicesBySeller);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  //POST SERVICE to add service to a cleaner already registered and logged in
  router.post('/service', (req, res) => {
    console.log("REQ Headers", req.headers)
    console.log("REQ BODY", req.body)

    //to get cleaner Id from token in headers
    const token = req.headers.cleanerttoken;
    console.log("token", token)
    const decoded = jwt.verify(token, webToken);
    console.log("token decoded", decoded)
    const cleanerIdDecoded = decoded.id;

    //to get cleaner Id from route
    const cleaner_id = req.params.id;

    const { name, price, typeofservice, deposit } = req.body;
    if (!name || !price || !typeofservice) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //addService(name, price, typeofservice, deposit, cleaner_id)
    addService(name, price*100, typeofservice, deposit, cleanerIdDecoded)
      .then(newService => {
        if (newService[0] === undefined) {
          console.log("Something went frong while register a new service!");
          res.status(400).json({ msg: 'Sorry, something went wrong service not saved. Try again' });
        } else {
          res.json({
            service: {
              id: newService[0].id,
              name: newService[0].name,
              price: newService[0].price,
              typeofservice: newService[0].typeofservice,
              deposit: newService[0].deposit,
              cleaner_id: newService[0].cleaner_id
            }
          });
        }
      })
      .catch(err => res.json({ error: err.message }));
  });

  router.get('/services', (req, res) => {
    //console.log("get sellers services");
    getSellersServices() //original
      //getSellersServicesRatings()
      .then((services) => {
        //console.log("servicies", services);
        getRatings()
          .then((ratings) => {
            //console.log("ratings", ratings);
            const formattedServices = getServicesBySellers(services); //original
            //const formattedServices = getServicesBySellersRatings(services);
            for (let cleaner of formattedServices) {
              //console.log("cleaner", cleaner);
              for (let rate of ratings) {
                //console.log("rate", rate);
                if (rate.cleaner_id === cleaner.cleanerId) {
                  cleaner.rating.push(rate);
                }
              }
            }
            res.json(formattedServices);
          })
          .catch((err) => res.json({ error: err.message }));
      });
  });



  return router;
};
