const jwt = require('jsonwebtoken');
const {
  getJWTFromCookie,
  getTokenFromAuthHeader
} = require('./getToken');

module.exports = function (req, res, next) {
  const redirectPath = '/login';
  try {
    // IF AUTH HEADER PRESENT //////////////////////////////////////////////////
    if (req.headers.authorization) {
      const token = getTokenFromAuthHeader(req.headers.authorization);
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      if (verified.login) {
        next();
      } else {
        res.status(404).json({
          error: 'User not logged in'
        })
        // res.redirect(redirectPath);
      }
      //////////////////////////////////////////////////////////////////////////
      // IF AUTH COOKIE PRESENT
    } else if (req.headers.cookie) {
      const verified = getJWTFromCookie(req.headers.cookie);
      if (verified && verified.login) {
        next();
      } else {
        res.status(404).json({
          error: 'User not logged in'
        })
        // res.redirect(redirectPath);
        // response.writeHead(301,
        //   {Location: process.env.URL + redirectPath }
        // );
        // response.end();
      }
    } else {
      res.status(404).json({
        error: 'User not logged in'
      })
      // res.redirect(redirectPath);
    }

  } catch (err) {
    console.error(err);
    res.status(404).json({
      error: 'User not logged in'
    })
    //res.redirect(redirectPath);
  }
}