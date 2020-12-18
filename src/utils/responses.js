const boom = require('@hapi/boom');

const responses = {
  responseWithoutError: (res, message, content) => {
    const response = () => res.status(200).json({ message, error: null, content });
    return response();
  },
  validationErrorHandler: (errors) => {
    const validationError = boom.badRequest();
    validationError.output.payload.details = errors.mapped();
    return validationError;
  },
};

module.exports = responses;
