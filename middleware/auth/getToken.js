const jwt = require('jsonwebtoken');
const { Base64 } = require('js-base64');

function getTokenFromAuthHeader(header) {
  return header.slice(7);
}

function getTokenFromBase64Token(base64token) {
  return Base64.decode(base64token);
}

function getJWTFromCookie(cookie) {
  const token = getTokenFromBase64Token(decodeURIComponent(cookie.slice(5)));
  try {
    return jwt.verify(token, process.env.AUTH_SECRET);
  } catch(err) {
    console.error(`\nCouldn't verify token ${token} from cookie ${cookie}\n`);
  }
}

module.exports = {
  getJWTFromCookie,
  getTokenFromBase64Token,
  getTokenFromAuthHeader
};
