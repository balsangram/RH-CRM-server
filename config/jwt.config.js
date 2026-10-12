module.exports = {
  accessSecret: process.env.JWT_ACCESS_SECRET || 'default_jwt_access_secret_change_me',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret_change_me',
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
