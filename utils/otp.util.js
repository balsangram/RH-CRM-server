const crypto = require('crypto');

/**
 * Generate a cryptographically secure numeric OTP
 * @param {number} length
 */
const generateNumericOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    otp += digits[randomBytes[i] % 10];
  }
  return otp;
};

/**
 * Hash an OTP using SHA256 before persisting
 * @param {string} otp
 */
const hashOTP = (otp) => {
  return crypto.createHash('sha256').update(String(otp)).digest('hex');
};

/**
 * Verify plaintext OTP against hashed OTP
 * @param {string} plainOTP
 * @param {string} hashedOTP
 */
const verifyOTP = (plainOTP, hashedOTP) => {
  const hash = hashOTP(plainOTP);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedOTP));
};

module.exports = {
  generateNumericOTP,
  hashOTP,
  verifyOTP,
};
