module.exports = (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  }
  return res.json({ message: "You must login first!" })
}