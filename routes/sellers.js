
const express = require('express');
const router = express.Router();
const { getServicesBySellers } = require('../helpers/dataHelpers');

//add more function as I create them to access the database
module.exports = ({ getSellers,  getSellersServices }) => {
  console.log('This is from GET seller')
  /* GET users listing. */
  router.get('/', (req, res) => {
    getSellers()
      .then((sellers) => res.json(sellers))
      .catch((err) => res.json({ error: err.message }));
  });

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



















/*
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const authUser = require('../middleWare/authUser')

const webToken = process.env.JWT_SECRET_KEY;


let Seller = require('../models/seller.model'); // retrieve from models folder
let Service = require('../models/service.model'); // retrieve from models folder


router.route('/').get((req, res) => {
    Seller.find()
      .then(sellers => res.json(sellers))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // This is a private get route autheticated by webToken -> notice the authUser within the argument
router.route('/login').get(authUser,(req, res) => {
  Seller.findById(req.seller.id)
    .select('-password') // - mean not to include
    .then(seller => {
      res.json(seller);
    });
})


/// users/register POST route to register users
router.route('/register').post((req, res) => {

  console.log('register')
  const { name, email, password, phone, address, description, latitude, longitude } = req.body;

  if(!name || !email || !password){
    return res.status(400).json({msg: "Please enter all fields"});
  }

  Seller.findOne({ email })
    .then(seller => {
      if(seller) return res.status(400).json({msg: "User already exist"});

      const newSeller = new Seller({name, email, password, phone, address, description, latitude, longitude});

      //create salt & hash 
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSeller.password, salt, (err, hash) => {
          if(err) throw err;
          newSeller.password = hash;

          // now we can save the new user 
          newSeller.save()
          .then(seller => {
            // Apply json web token
            jwt.sign(
              { id: seller._id },
              webToken, //This is the secret web token in the env variable
              { expiresIn: 3600 }, // expires in 1 hour
              (err, token) => {
                if(err) throw err;

                res.json({
                  msg:"connection establish",
                  token,
                  seller: {
                    id: seller._id,
                    name: seller.name,
                    email: seller.email,
                    phone: seller.phone,
                    address: seller.address,
                    description: seller.description,
                    latitude: seller.latitude,
                    longitude: seller.longitude
                  }
                });

              }
            )

          })
          .catch(err => res.status(400).json('Error: ' + err));
        });
      })
    })
});  


router.route('/api/:id/service').get((req, res) => {
  console.log('/api/:id/service')
  Service.find().where('seller').equals(req.params.id)
    .then(sellers => res.json(sellers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/:id').get((req, res) => {
  console.log('/api/:id')
  Seller.findById(req.params.id)
    .then(sellers => res.json(sellers))
    .catch(err => res.status(400).json('Error: ' + err));
});





///// Testing uncomment later

router.route('/api/:id/service').post((req, res) => {
  console.log('/api/:id/service')
  const {nameOfService, typeOfService, price, deposit} = req.body;
  Seller.findById(req.params.id)
  .then(seller1 => {
      console.log("THIS IS SELLER", seller1)
     const seller = seller1._id
     const newService = new Service(
         {nameOfService, typeOfService, price, deposit, seller});
         
     newService.save()
         .then(() => res.json('Service Added!'))
         .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});
*/

//// This is the test for registration to see if database is connected//////
/*   router.route('/').post((req, res) => {

    const {name, email, description, address} = req.body;

    Seller.findOne({email})
        .then(user => {
        if(user) return res.status(400).json({msg: "User already exist"});
        const newSeller = new Seller({name, email, description, address});

        newSeller.save()
          .then(() => {res.json('Seller Added!')})
          .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
  }); */

/*
  ///// users/login POST route 
router.route('/login').post((req, res) => {
  
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({msg: "Please enter all fields"});
  }

  Seller.findOne({ email })
    .then(seller => {
      if(!seller) return res.status(400).json({msg: "User Does not exists"});

      // Validate password

      bcrypt.compare(password, seller.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials'})

          // Apply json web token
          jwt.sign(
            { id: seller._id },
            webToken, //This is the secret web token in the env variable
            { expiresIn: 3600 }, // expires in 1 hour
            (err, token) => {
              if(err) throw err;

              res.json({
                token,
                seller: {
                  id: seller._id,
                  name: seller.name,
                  email: seller.email
                }
              });

            }
          )
        })
    })
});




  module.exports = router;
*/
