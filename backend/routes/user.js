const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../db/user");

const router = express.Router()

router.post("/signp", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => { //return promise inside a callback when has the password is hashed
      const user = new User({ // create new user on mongoose with schema predifinded
        email: req.body.email,
        password: hash
      });
      user.save() //save user to db
        .then(result => {
          res.status(201).json({ //successfully created user
            message: 'User Created',
            result: result
          });
        })
        .catch(err => { // failed to save user 
          res.status(500).json({
            error: err
          })
        });
    });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }) // search for user with email on database and return it
    .then(user => { // this promise take the previous value (object user from db)
      if (!user) { // email not found on mongoose
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => { // result contains the bool of the previous compraison
      if (!result) { //user found but password enter is inccorect
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      // create token
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
        'secret_this_should_be_longer',
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      })
    })
    .catch(err => { // catch any other error happened will auth
      console.log(err); 
      return res.status(401).json({
        message: "Auth failed!"
      });
    });
});

module.exports = router;

/*** *
 * database login
 * login : elbo
 * mdp : ox7Q39FSvkpyvkMw
*/