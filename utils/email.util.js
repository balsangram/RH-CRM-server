const nodemailer = require('nodemailer');
const mailerConfig = require('../config/mailer.config');
const logger = require('./logger.util');

const transporter = nodemailer.createTransport({
  host: mailerConfig.host,
  port: mailerConfig.port,
  secure: mailerConfig.secure,
  auth: {
    user: mailerConfig.auth.user,
    pass: mailerConfig.auth.pass,
  },
});

/**
 * Send an email using Nodemailer
 * @param {object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} [options.text]
 * @param {string} [options.html]
 * @param {Array} [options.attachments]
 */
const sendEmail = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    const mailOptions = {
      from: mailerConfig.from,
      to,
      subject,
      text,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully: ${info.messageId} to ${to}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  transporter,
  sendEmail,
};
