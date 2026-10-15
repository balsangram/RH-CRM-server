import { sendEmail } from '../utils/email.util.js';
import logger from '../utils/logger.util.js';

/**
 * Background email delivery job handler
 */
export const processEmailJob = async (jobData) => {
  try {
    logger.info(`Processing background email job for: ${jobData.to}`);
    await sendEmail(jobData);
    logger.info(`Background email job completed successfully for: ${jobData.to}`);
  } catch (error) {
    logger.error(`Background email job failed: ${error.message}`);
    throw error;
  }
};

export default {
  processEmailJob,
};
