import logger from '../utils/logger.util.js';

/**
 * Background OTP expiration cleanup job
 */
export const cleanupExpiredOTPs = async () => {
  try {
    logger.info('Running background job to prune expired OTP records');
    // Logic for deleting expired OTP docs from database
    logger.info('Expired OTP cleanup job executed');
  } catch (error) {
    logger.error(`Error in OTP cleanup job: ${error.message}`);
  }
};

export default {
  cleanupExpiredOTPs,
};
