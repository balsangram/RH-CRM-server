const { sendEmail } = require('../utils/email.util');
const logger = require('../utils/logger.util');

/**
 * Background email delivery job handler
 */
const processEmailJob = async (jobData) => {
  try {
    logger.info(`Processing background email job for: ${jobData.to}`);
    await sendEmail(jobData);
    logger.info(`Background email job completed successfully for: ${jobData.to}`);
  } catch (error) {
    logger.error(`Background email job failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  processEmailJob,
};
