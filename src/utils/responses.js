const boom = require('@hapi/boom');

module.exports = {
  responseWithoutError: (res, message, status, content) => {
    const response = () => res.status(status).json({ message, error: null, content });
    return response();
  },
  validationErrorHandler: (errors) => {
    const validationError = boom.badRequest();
    validationError.output.payload.details = errors.mapped();
    return validationError;
  },
};
