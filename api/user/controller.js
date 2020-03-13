const express = require('express');
const User = require('./model');
const jwt = require('jsonwebtoken');

const controller = express.Router();

//        AUTHORIZATION
//  JWT token = string, which has three parts separated with two dots, e.g.
// 1. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// 2. eyJsb2dpbiI6InV0dGVyb3R0ZXIiLCJpYXQiOjE1ODQxMDQzOTYsImV4cCI6MTU4NDEwNzk5Nn0.
// 3. y20lq-HuqwRTnDjyZ7BZ37CCqRyo9bBaEtiVW2BR_9E
//  JWT token string can be decoded to get header, payload and signature

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

function logIn(req, res) {
  let errors = {};
  const { login, password } = req.body;
  User.find({ login }, (err, users) => {
    if (err) {
      errors.user = err;
      res.status(500).json(errors);
    } else if (!users.length){
      errors.user = `User ${login} doesn't exist`;
      res.status(404).json(errors);
    } else {
      const user = users[0];
      const { hash } = user;
      if(user.validatePassword(hash, password)) {
        const token = jwt.sign(
          { login },
          process.env.AUTH_SECRET,
          { expiresIn: '1h' }
        );
        // we can send JWT token using:
        // 1. cookie: res.cookie('token', token, { signed: true });
        // 2. auth header: res.header('Authorization', `Bearer ${token}`);
        // 3. any other way
        res.header('Authorization', `Bearer ${token}`);

        res.send('success');
      } else {
        errors.user = `Username or password is not valid`;
        res.status(404).json(errors);
      }
    }
  })
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
controller.post('/login', logIn);

module.exports = controller;
