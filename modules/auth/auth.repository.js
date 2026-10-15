
import OTP from "../models/otp.model.js";

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