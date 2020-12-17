const boom = require('@hapi/boom');

const logErrors = (err, req, res, next) => {
  console.error({ err });
  if (!err.isBoom) {
    return next(boom.badImplementation(err));
  }
  return next(err);
};

module.exports = logErrors;
