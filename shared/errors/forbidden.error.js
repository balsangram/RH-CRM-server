const ApiError = require('./api.error');
const HttpStatus = require('../constants/http-status.constants');
const ErrorCodes = require('../constants/error-codes.constants');

class ForbiddenError extends ApiError {
  constructor(message = 'Access forbidden: Insufficient permissions', details = null) {
    super(HttpStatus.FORBIDDEN, message, ErrorCodes.UNAUTHORIZED, details);
  }
}

module.exports = ForbiddenError;
