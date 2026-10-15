import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';
import UnauthorizedError from '../shared/errors/unauthorized.error.js';

/**
 * Middleware to verify JWT Access Token from Authorization Header or HTTP-only Cookie
 */
const authenticate = (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError('Authentication token missing or invalid');
    }

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
