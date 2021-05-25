const boom = require('@hapi/boom');
const logger = require('../utils/logger');

const asyncMiddleware = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    logger.error(err);
    return !err.isBoom ? next(boom.badImplementation(err)) : next(err);
  }
};

module.exports = asyncMiddleware;
