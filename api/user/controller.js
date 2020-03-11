const express = require('express');
const User = require('./model');

const controller = express.Router();

//        AUTHORIZATION
//        [REGISTER]
// BACK-END         FRONT-END
//            <--   register(login, password)
// validate(login, password)
// generate hash(password)
// registers new user(login, hash) in DB

//        [LOGIN]
// BACK-END         FRONT-END
//            <--   login(login, password)
// validate(login)
// generate hash (password)
// validate(hash)
// JWT token / cookie  --> store(JWT token / cookie)

function register(req, res) {
  let errors = {};

  const { login, password } = req.body;

  User.find({ login }, (err, users) => {
    if(err) {
      errors.register = err;
      res.status(404).json({ errors });
    } else if(users.length) {
      errors.login = `User ${login} already exists`;
      res.status(404).json({ errors });
    } else {
      const newUser = new User({
        login
      });
      const hash = newUser.getHash(password);
      newUser.hash = hash;
      newUser.save((err, user) => {
        if(err) {
          errors.register = err;
          res.status(404).json({ errors });
        } else {
          res.json(user);
        }
      });
    }
  })
}

function login(req, res) {
}

function get(req, res) {
  User.find((err, users) => {
    if(err) {
      errors.users = err;
      res.status(404).json({ errors });
    } else {
      res.json(users);
    }
  });
}

controller.get('/', get);
controller.post('/register', register);
controller.post('/login', login);

module.exports = controller;
