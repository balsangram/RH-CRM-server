const ApiError = require('./api.error');
const HttpStatus = require('../constants/http-status.constants');
const ErrorCodes = require('../constants/error-codes.constants');

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found', details = null) {
    super(HttpStatus.NOT_FOUND, message, ErrorCodes.RESOURCE_NOT_FOUND, details);
  }
}

module.exports = NotFoundError;
