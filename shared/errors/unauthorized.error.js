const ApiError = require('./api.error');
const HttpStatus = require('../constants/http-status.constants');
const ErrorCodes = require('../constants/error-codes.constants');

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access', details = null) {
    super(HttpStatus.UNAUTHORIZED, message, ErrorCodes.UNAUTHENTICATED, details);
  }
}

module.exports = UnauthorizedError;
