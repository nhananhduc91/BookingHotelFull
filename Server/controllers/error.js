exports.get404 = (req, res, next) => {
  res.status(404).json('Page not found.')
};

exports.get500 = (req, res, next) => {
  res.status(500).json('Server error.')
};