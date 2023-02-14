const pageNotFound = (req, res, next) => {
  const error = new Error(`Page not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = pageNotFound;