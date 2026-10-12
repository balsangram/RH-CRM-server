const { generateAndUploadInvoice } = require('../utils/invoice.util');
const logger = require('../utils/logger.util');

/**
 * Background invoice PDF generation & AWS S3 upload job handler
 */
const processInvoiceGenerationJob = async ({ invoiceData, s3Key }) => {
  try {
    logger.info(`Starting invoice generation job for Invoice #${invoiceData.invoiceNumber}`);
    const result = await generateAndUploadInvoice(invoiceData, s3Key);
    logger.info(`Invoice generated and stored in AWS S3 at: ${result.location}`);
    return result;
  } catch (error) {
    logger.error(`Failed to generate and upload invoice: ${error.message}`);
    throw error;
  }
};

module.exports = {
  processInvoiceGenerationJob,
};
