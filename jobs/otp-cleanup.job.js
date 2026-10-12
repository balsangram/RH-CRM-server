const logger = require('../utils/logger.util');

/**
 * Background OTP expiration cleanup job
 */
const cleanupExpiredOTPs = async () => {
  try {
    logger.info('Running background job to prune expired OTP records');
    // Logic for deleting expired OTP docs from database
    logger.info('Expired OTP cleanup job executed');
  } catch (error) {
    logger.error(`Error in OTP cleanup job: ${error.message}`);
  }
};

module.exports = {
  cleanupExpiredOTPs,
};
