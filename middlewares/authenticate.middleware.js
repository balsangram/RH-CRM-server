import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';
import UnauthorizedError from '../shared/errors/unauthorized.error.js';

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

export default authenticate;
export { authenticate };
