const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const redirectPath = '/login';
  try {
    if (req.headers.authorization) {
      const token = getTokenFromAuthHeader(req);
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      if (verified.login) {
        next();
      } else {
        res.redirect(redirectPath);
      }
    //  TO-DO authorize token sent in cookie
    } else if(req.cookies) {
      const token = getTokenFromCookie(req);
      console.log('COOKIES = ', req.cookies);
      res.redirect(redirectPath);
    /////////////////////////////////////////
    } else {
      res.redirect(redirectPath);
    }

  } catch (err) {
    console.error(err);
    res.redirect(redirectPath);
  }
}

function getTokenFromAuthHeader(req) {
  return req.headers.authorization.slice(7);
}

function getTokenFromCookie(req) {
  return req.cookies;
}
