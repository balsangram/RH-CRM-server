const PDFDocument = require('pdfkit');
const { uploadToS3 } = require('./file.util');
const logger = require('./logger.util');

/**
 * Generate a PDF invoice Buffer using PDFKit
 * @param {object} invoiceData
 * @returns {Promise<Buffer>}
 */
const generateInvoicePDFBuffer = (invoiceData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      doc.fontSize(20).text('RH GLOBAL CRM - INVOICE', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice Number: ${invoiceData.invoiceNumber || 'INV-0001'}`);
      doc.text(`Date: ${invoiceData.date || new Date().toLocaleDateString()}`);
      doc.text(`Billed To: ${invoiceData.customerName || 'Customer'}`);
      doc.text(`Email: ${invoiceData.customerEmail || 'customer@example.com'}`);
      doc.moveDown();

      // Divider
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Table Header
      doc.text('Description', 50, doc.y, { width: 300 });
      doc.text('Amount', 400, doc.y, { width: 100, align: 'right' });
      doc.moveDown();

      // Items
      const items = invoiceData.items || [{ description: 'Visa Processing Service', amount: 0 }];
      items.forEach((item) => {
        doc.text(item.description, 50, doc.y, { width: 300 });
        doc.text(`$${Number(item.amount).toFixed(2)}`, 400, doc.y, { width: 100, align: 'right' });
        doc.moveDown();
      });

      // Total
      doc.moveDown();
      doc.fontSize(14).text(`Total: $${Number(invoiceData.totalAmount || 0).toFixed(2)}`, { align: 'right' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate invoice PDF and automatically upload to AWS S3
 * @param {object} invoiceData
 * @param {string} s3Key
 * @returns {Promise<{ key: string, location: string, bucket: string }>}
 */
const generateAndUploadInvoice = async (invoiceData, s3Key) => {
  try {
    const pdfBuffer = await generateInvoicePDFBuffer(invoiceData);
    const uploadResult = await uploadToS3(pdfBuffer, s3Key, 'application/pdf');
    logger.info(`Invoice generated and uploaded to S3: ${s3Key}`);
    return uploadResult;
  } catch (error) {
    logger.error(`Error generating and uploading invoice: ${error.message}`);
    throw error;
  }
};

module.exports = {
  generateInvoicePDFBuffer,
  generateAndUploadInvoice,
};
