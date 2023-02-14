module.exports = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  }
  return res.json({ message: "Unauthenticated!" })
}