
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authUser = require('../middleWare/authUser');
const { getServicesBySellers, getServicesBySeller, getServicesBySellersRatings, getRatingsByUsers } = require('../helpers/dataHelpers');

const webToken = process.env.JWT_SECRET_KEY;

//add more function as I create them to access the database
module.exports = ({ getRatingsById, getSellers, getSellersServices, getSellerByEmail, addSeller, addService, getSellerById, getServicesById, getRatings, updateService, deleteService, getSellersServicesRatings }) => {

  /* GET users listing. */
  router.get('/', (req, res) => {
    getSellers()
      .then((sellers) => res.json(sellers))
      .catch((err) => res.json({ error: err.message }));
  });

  //GET LOGIN
  router.get('/login', authUser, (req, res) => {
    getSellerById(req.user.id)
      .then((seller) => {
        res.json(seller);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  //POST REGISTER
  router.post('/register', (req, res) => {
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
                  //console.log("picture_url", pictureUrl);
                  if (newUser[0] === undefined) {
                    console.log("Something went frong while register a new cleaner!");
                    res.status(400).json({ msg: 'Sorry, something went wrong user not saved. Try again' });
                  } else {
                    jwt.sign(
                      { id: newUser[0].id },
                      webToken, //This is the secret web token in the env variable
                      //{ expiresIn: 3600 }, // expires in 1 hour
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

  router.get('/profile/:id', (req, res) => {
    console.log("get seller services req.params.id", req.params.id);

    getServicesById(req.params.id)
      .then((services) => {
        console.log("servicies", services);
        getRatingsById(req.params.id)
          .then((ratings) => {
            console.log("ratings", ratings);
            const formattedServices = getServicesBySeller(services); //original
            for (let cleaner of formattedServices) {
              for (let rate of ratings) {
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

  //POST SERVICE to add service to a cleaner already registered and logged in
  router.post('/service', (req, res) => {
    console.log("REQ Headers", req.headers);
    console.log("REQ BODY", req.body);

    //to get cleaner Id from token in headers
    const token = req.headers.cleanerttoken;
    console.log("token", token);
    const decoded = jwt.verify(token, webToken);
    console.log("token decoded", decoded);
    const cleanerIdDecoded = decoded.id;

    //to get cleaner Id from route
    const cleaner_id = req.params.id;

    const { name, price, typeofservice, deposit } = req.body;
    if (!name || !price || !typeofservice) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //addService(name, price, typeofservice, deposit, cleaner_id)
    addService(name, price * 100, typeofservice, deposit, cleanerIdDecoded)
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

  //POST SERVICE to UPDATE existing service of a cleaner
  router.post('/service/update', (req, res) => {
    console.log("REQ Headers", req.headers);
    console.log("REQ BODY", req.body);

    //to get cleaner Id from token in headers
    const token = req.headers.cleanerttoken;
    console.log("token", token);
    const decoded = jwt.verify(token, webToken);
    console.log("token decoded", decoded);
    const cleanerIdDecoded = decoded.id;

    //to get cleaner Id from route
    const cleaner_id = req.params.id;

    const { name, price, typeofservice, deposit, service_id } = req.body;
    if (!name || !price || !typeofservice) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    updateService(name, price * 100, typeofservice, deposit, cleanerIdDecoded, service_id)
      .then(updateService => {
        if (updateService[0] === undefined) {
          console.log("Something went frong while register the updated service!");
          res.status(400).json({ msg: 'Sorry, something went wrong service not updated. Try again' });
        } else {
          res.json({
            service: {
              id: updateService[0].id,
              name: updateService[0].name,
              price: updateService[0].price,
              typeofservice: updateService[0].typeofservice,
              deposit: updateService[0].deposit,
              cleaner_id: updateService[0].cleaner_id
            }
          });
        }
      })
      .catch(err => res.json({ error: err.message }));
  });

  //POST SERVICE to DELETE existing service of a cleaner
  router.post('/service/delete', (req, res) => {
    console.log("REQ Headers", req.headers);
    console.log("REQ BODY", req.body);

    //to get cleaner Id from token in headers
    const token = req.headers.cleanerttoken;
    console.log("token", token);
    const decoded = jwt.verify(token, webToken);
    console.log("token decoded", decoded);
    const cleanerIdDecoded = decoded.id;

    //to get cleaner Id from route
    const { cleanerId, serviceId } = req.body;
    console.log("service_id", serviceId);
    deleteService(serviceId)
      .then(deleteService => {
        console.log("Service deleted", deleteService);
        res.json({
          service: 'deleted'
        });
      });
  });

  router.get('/services', (req, res) => {
    getSellersServices() //original
      .then((services) => {
        console.log("servicies", services);
        getRatings()
          .then((ratings) => {
            const formattedServices = getServicesBySellers(services); //original
            for (let cleaner of formattedServices) {
              for (let rate of ratings) {
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
