const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const UnauthorizedError = require('../shared/errors/unauthorized.error');

/**
 * Middleware to verify JWT Access Token
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.accessSecret);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Token expired'));
    } else if (error.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Invalid token signature'));
    } else {
      next(error);
    }
  }
};

module.exports = authenticate;
