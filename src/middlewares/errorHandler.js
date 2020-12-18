// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, payload } = err.output;
  return res.status(statusCode).json(payload);
};

module.exports = errorHandler;
