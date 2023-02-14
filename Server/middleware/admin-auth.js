module.exports = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.user.isAdmin === "yes") {
    next();
  }
};
