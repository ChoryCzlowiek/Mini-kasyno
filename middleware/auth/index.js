const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const base64 = require('js-base64');

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
      const token = getTokenFromCookie(req.headers.cookie.slice(5));
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      console.log('verfied token', verified);
      if (verified.login) {
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

function getTokenFromAuthHeader(header) {
  return header.slice(7);
}

function getTokenFromCookie(cookie) {
  console.log(cookie);
  const str = Base64.decode(cookie);
  console.log(str);
  return str;
}

module.exports.getTokenFromCookie = getTokenFromCookie;