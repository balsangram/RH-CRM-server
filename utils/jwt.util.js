import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';

/**
 * Generate Access and Refresh JWT Tokens
 * @param {object} payload - Claims to sign ({ id, email, role, userType })
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn || '15m',
  });

  const refreshToken = jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn || '7d',
  });

  return { accessToken, refreshToken };
};

/**
 * Verify Access Token
 * @param {string} token
 * @returns {object} Decoded payload
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, jwtConfig.accessSecret);
};

/**
 * Verify Refresh Token
 * @param {string} token
 * @returns {object} Decoded payload
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, jwtConfig.refreshSecret);
};

export default {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};
