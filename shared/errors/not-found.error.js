import ApiError from './api.error.js';
import HttpStatus from '../constants/http-status.constants.js';
import ErrorCodes from '../constants/error-codes.constants.js';

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found', details = null) {
    super(HttpStatus.NOT_FOUND, message, ErrorCodes.RESOURCE_NOT_FOUND, details);
  }
}

export default NotFoundError;
export { NotFoundError };
