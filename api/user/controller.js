const express = require('express');
const User = require('./model');
// const Balance = require('../balance/model.js');
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

  const {
    login,
    password
  } = req.body;

  User.find({
    login
  }, (err, users) => {
    if (err) {
      errors.register = err;
      res.status(404).json({
        errors
      });
    } else if (users.length) {
      errors.login = `Użytkownik ${login} już istnieje`;
      res.status(404).json({
        errors
      });
    } else {
      const newUser = new User({
        ...req.body,
        balance: 0,
        nOfGames: 0,
        nOfWonGames: 0,
        nOfDraws: 0,
        nOfLosses: 0
      });
      newUser.balance = 1000;
      delete newUser.password;
      const hash = newUser.getHash(password);
      newUser.hash = hash;
      newUser.save((err, user) => {
        if (err) {
          errors.register = err;
          res.status(404).json({
            errors
          });
        } else {
          res.json(user);
        }
      });
    }
  })
}

function logIn(req, res) {
  res.clearCookie('auth')
  let errors = {};
  const {
    login,
    password
  } = req.body;
  User.find({
    login
  }, (err, users) => {
    if (err) {
      errors.user = err;
      res.status(500).json(errors);
    } else if (!users.length) {
      errors.user = `Użytkownik ${login} nie istnieje`;
      res.status(404).json(errors);
    } else {
      const user = users[0];
      const {
        hash
      } = user;
      if (user.validatePassword(hash, password)) {
        const token = jwt.sign({
            login
          },
          process.env.AUTH_SECRET, {
            expiresIn: '1h'
          }
        );
        // we can send JWT token using:
        // 1. cookie: res.cookie('token', token, { signed: true });
        // 2. auth header: res.header('Authorization', `Bearer ${token}`);
        // 3. any other way

        // send cookie in response with base64 encoded token string
        const buff = Buffer.from(token);
        const base64token = buff.toString('base64');
        res.cookie(
          'auth', base64token,
          //          { signed: true, httpOnly: true }
        );

        // send authorization header in response with bearer token string
        // res.header('Authorization', `Bearer ${token}`);

        const resData = {
          ...user['_doc'],
          success: true
        };
        delete resData.hash;
        res.json(resData);
      } else {
        errors.user = `Username or password is not valid`;
        res.status(404).json(errors);
      }
    }
  })
}

function get(req, res) {
  User.find((err, users) => {
    if (err) {
      errors.users = err;
      res.status(404).json({
        errors
      });
    } else {
      res.json(users);
    }
  });
}

function logOut(req, res) {
  res.clearCookie('auth', {
    path: '/'
  });
  res.end();
}

function post(req, res) {
  let errors = {};
  // method POST http://localhost:5000/api/user?id=${id_usera} (body: zmiany)

  User.findByIdAndUpdate(req.query.id, req.body, {
    new: true
  }, (err, user) => {
    if (err) {
      errors.users = err;
      res.status(404).json({
        errors
      });
    } else if (!user) {
      errors.user = 'User not found';
      res.status(404).json({
        errors
      });
    } else {
      res.json(user);
    }
  });
}

controller.get('/', get);
controller.post('/', require('../../middleware/auth'), post);
controller.post('/register', register);
controller.post('/login', logIn);
controller.post('/logout', logOut)

module.exports = controller;