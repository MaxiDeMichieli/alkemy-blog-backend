const boom = require('@hapi/boom');

const responsesBuilder = {
  responseWithoutError: (res, status, content) => {
    const response = () => res.status(status).json(content);
    return response();
  },
  validationErrorHandler: (errors) => {
    const validationError = boom.badRequest();
    validationError.output.payload.details = errors.mapped();
    return validationError;
  },
};

module.exports = responsesBuilder;
