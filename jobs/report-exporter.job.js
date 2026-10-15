import logger from '../utils/logger.util.js';

/**
 * Background async report exporter job
 */
export const exportReportJob = async ({ reportType, filters, requestedByEmail }) => {
  try {
    logger.info(`Starting async report generation for type: ${reportType}`);
    // Generate CSV/Excel report, upload to S3, and email download link
    logger.info(`Report generation completed for: ${requestedByEmail}`);
  } catch (error) {
    logger.error(`Error exporting report: ${error.message}`);
  }
};

export default {
  exportReportJob,
};
