const ApiError = require('./api.error');
const HttpStatus = require('../constants/http-status.constants');
const ErrorCodes = require('../constants/error-codes.constants');

class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', details = null) {
    super(HttpStatus.BAD_REQUEST, message, ErrorCodes.BAD_REQUEST, details);
  }
}

module.exports = BadRequestError;
