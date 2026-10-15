import HttpStatus from '../shared/constants/http-status.constants.js';

/**
 * Standard API Success Response
 */
export const success = (res, message = 'Success', data = {}, statusCode = HttpStatus.OK, meta = null) => {
  const payload = {
    success: true,
    message,
    data,
  };

  if (meta) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

/**
 * Standard API Created Response
 */
export const created = (res, message = 'Resource created successfully', data = {}, meta = null) => {
  return success(res, message, data, HttpStatus.CREATED, meta);
};

/**
 * Standard API Error Response
 */
export const error = (
  res,
  message = 'An unexpected error occurred',
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  errorCode = 'INTERNAL_ERROR',
  errors = null
) => {
  const payload = {
    success: false,
    message,
    errorCode,
  };

  if (errors) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

export default {
  success,
  created,
  error,
};
