import logger from '../utils/logger.util.js';
import response from '../utils/response.util.js';
import HttpStatus from '../shared/constants/http-status.constants.js';

/**
 * Global centralized error-handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let errorCode = err.errorCode || 'INTERNAL_ERROR';
  let details = err.details || null;

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    statusCode = HttpStatus.BAD_REQUEST;
    errorCode = 'FILE_UPLOAD_ERROR';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Uploaded file exceeds the maximum allowed size limit';
    } else {
      message = `Upload error: ${err.message}`;
    }
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = HttpStatus.BAD_REQUEST;
    errorCode = 'INVALID_ID';
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = HttpStatus.CONFLICT;
    errorCode = 'DUPLICATE_ENTRY';
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate field value entered for '${field}'`;
  }

  // Log server errors
  if (statusCode >= 500) {
    logger.error(`[500 Server Error] ${req.method} ${req.originalUrl} - ${err.stack || err.message}`);
  } else {
    logger.warn(`[Client Error ${statusCode}] ${req.method} ${req.originalUrl} - ${message}`);
  }

  return response.error(res, message, statusCode, errorCode, details);
};

export default errorHandler;
export { errorHandler };
