import { generateAndUploadInvoice } from '../utils/invoice.util.js';
import logger from '../utils/logger.util.js';

/**
 * Background invoice PDF generation & AWS S3 upload job handler
 */
export const processInvoiceGenerationJob = async ({ invoiceData, s3Key }) => {
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

export default {
  processInvoiceGenerationJob,
};
