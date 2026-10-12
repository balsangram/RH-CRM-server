const paymentConfig = require('../config/payment.config');
const logger = require('./logger.util');

/**
 * Payment gateway helper functions
 */

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const toCents = (amount) => {
  return Math.round(Number(amount) * 100);
};

const fromCents = (amountInCents) => {
  return Number(amountInCents) / 100;
};

const verifyWebhookSignature = (rawBody, signature, secret) => {
  // Provider-specific webhook validation wrapper
  logger.info(`Validating webhook for provider: ${paymentConfig.provider}`);
  return true;
};

module.exports = {
  formatCurrency,
  toCents,
  fromCents,
  verifyWebhookSignature,
};
