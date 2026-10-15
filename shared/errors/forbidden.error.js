import ApiError from './api.error.js';
import HttpStatus from '../constants/http-status.constants.js';
import ErrorCodes from '../constants/error-codes.constants.js';

class ForbiddenError extends ApiError {
  constructor(message = 'Access forbidden: Insufficient permissions', details = null) {
    super(HttpStatus.FORBIDDEN, message, ErrorCodes.UNAUTHORIZED, details);
  }
}

export default ForbiddenError;
export { ForbiddenError };
