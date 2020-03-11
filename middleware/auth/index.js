const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const redirectPath = '/login';
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.slice(7);
      console.log('token = ', token);
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
