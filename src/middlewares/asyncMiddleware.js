const boom = require('@hapi/boom');

const asyncMiddleware = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return !err.isBoom ? next(boom.badImplementation(err)) : next(err);
  }
};

module.exports = asyncMiddleware;
