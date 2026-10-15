import nodemailer from 'nodemailer';
import mailerConfig from '../config/mailer.config.js';
import logger from './logger.util.js';

export const transporter = nodemailer.createTransport({
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
export const sendEmail = async ({ to, subject, text, html, attachments = [] }) => {
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

export default {
  transporter,
  sendEmail,
};
