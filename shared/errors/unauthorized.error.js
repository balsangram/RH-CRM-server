import ApiError from './api.error.js';
import HttpStatus from '../constants/http-status.constants.js';
import ErrorCodes from '../constants/error-codes.constants.js';

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access', details = null) {
    super(HttpStatus.UNAUTHORIZED, message, ErrorCodes.UNAUTHENTICATED, details);
  }
}

export default UnauthorizedError;
export { UnauthorizedError };
