const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = function(req, res, next) {
  const redirectPath = '/login';
  try {
    if (req.headers.authorization) {
      const token = getTokenFromAuthHeader(req.headers.authorization);
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      if (verified.login) {
        next();
      } else {
        res.redirect(redirectPath);
      }
  } else if(req.headers.cookie) {
      const token = getTokenFromCookie(req.headers.cookie.slice(5));
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      if (verified.login) {
        next();
      } else {
        res.redirect(redirectPath);
      }
    } else {
      res.redirect(redirectPath);
    }

  } catch (err) {
    console.error(err);
    res.redirect(redirectPath);
  }
}

function getTokenFromAuthHeader(header) {
  return header.slice(7);
}

function getTokenFromCookie(cookie) {
  const buff = Buffer.from(cookie, 'base64')
  const str = buff.toString();
  return str;
}
