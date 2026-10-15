import rateLimit from 'express-rate-limit';
import appConfig from '../config/app.config.js';
import HttpStatus from '../shared/constants/http-status.constants.js';
import ErrorCodes from '../shared/constants/error-codes.constants.js';

const rateLimiter = rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  max: appConfig.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    errorCode: ErrorCodes.RATE_LIMIT_EXCEEDED,
  },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
});

export default rateLimiter;
export { rateLimiter };
