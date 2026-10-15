import crypto from 'crypto';
import { NODE_ENV } from '../config/env.config.js';

export const generateNumericOTP = (length = 6) => {
  if (NODE_ENV === "development") {
    return "123456";
  }

  const digits = "0123456789";
  let otp = "";
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    otp += digits[randomBytes[i] % 10];
  }

  return otp;
};

export const hashOTP = (otp) => {
  return crypto.createHash('sha256').update(String(otp)).digest('hex');
};


export const verifyOTP = (plainOTP, hashedOTP) => {
  if (!plainOTP || !hashedOTP) return false;
  const hash = hashOTP(plainOTP);
  const bufA = Buffer.from(hash);
  const bufB = Buffer.from(hashedOTP);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
};

