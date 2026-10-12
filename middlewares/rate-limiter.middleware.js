const rateLimit = require('express-rate-limit');
const appConfig = require('../config/app.config');
const HttpStatus = require('../shared/constants/http-status.constants');
const ErrorCodes = require('../shared/constants/error-codes.constants');

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

module.exports = rateLimiter;
