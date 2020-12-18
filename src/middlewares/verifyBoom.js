const boom = require('@hapi/boom');

const verifyBoom = (err, req, res, next) => {
  if (!err.isBoom) {
    return next(boom.badImplementation(err));
  }
  return next(err);
};

module.exports = verifyBoom;
