module.exports = function(req, res, next) {
  console.log(req.session);
  console.log(req.session._id);
  next();
}
