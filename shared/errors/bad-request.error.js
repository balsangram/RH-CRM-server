import ApiError from './api.error.js';
import HttpStatus from '../constants/http-status.constants.js';
import ErrorCodes from '../constants/error-codes.constants.js';

class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', details = null) {
    super(HttpStatus.BAD_REQUEST, message, ErrorCodes.BAD_REQUEST, details);
  }
}

export default BadRequestError;
export { BadRequestError };
