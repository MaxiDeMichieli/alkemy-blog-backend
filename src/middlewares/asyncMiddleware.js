const boom = require('@hapi/boom');

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const error = !err.isBoom ? next(boom.badImplementation(err)) : next(err);
    return error;
  });
};

module.exports = asyncMiddleware;
