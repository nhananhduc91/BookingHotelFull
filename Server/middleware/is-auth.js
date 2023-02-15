module.exports = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  }
}