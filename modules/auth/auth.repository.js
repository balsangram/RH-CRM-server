import OTP from "../../models/otp.model.js";

export const createOTP = async (data) => {
  return await OTP.create(data);
};

export const findOTPByEmailAndUserType = async (email, userType) => {
  return await OTP.findOne({
    email: email.toLowerCase().trim(),
    userType,
    isUsed: false,
  }).sort({ createdAt: -1 });
};

export const findActiveOTPByEmailAndUserType = async (email, userType) => {
  return await OTP.findOne({
    email: email.toLowerCase().trim(),
    userType,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });
};

export const findActiveOTP = async ({ userId, email, userType }) => {
  const query = {
    userType,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  };

  if (userId && email) {
    query.$or = [{ userId }, { email: email.toLowerCase().trim() }];
  } else if (userId) {
    query.userId = userId;
  } else if (email) {
    query.email = email.toLowerCase().trim();
  }

  return await OTP.findOne(query).sort({ createdAt: -1 });
};

export const deleteOTPByEmailAndUserType = async (email, userType) => {
  return await OTP.deleteMany({
    email: email.toLowerCase().trim(),
    userType,
  });
};

export const markOTPAsUsed = async (id) => {
  return await OTP.findByIdAndUpdate(
    id,
    { isUsed: true },
    { new: true }
  );
};

export default {
  createOTP,
  findOTPByEmailAndUserType,
  findActiveOTPByEmailAndUserType,
  findActiveOTP,
  deleteOTPByEmailAndUserType,
  markOTPAsUsed,
};