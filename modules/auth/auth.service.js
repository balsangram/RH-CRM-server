
import { generateNumericOTP, hashOTP } from "../../utils/otp.util.js";
import { createOTP, deleteOTPByEmailAndUserType } from "./auth.repository.js";

export const superAdminLoginEmailService = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const userType = "super_admin";

  const otp = generateNumericOTP(6);
  const otpHash = hashOTP(otp);

  // Remove previous OTPs for this email and user type
  await deleteOTPByEmailAndUserType(normalizedEmail, userType);

  // Save the new OTP
  await createOTP({
    email: normalizedEmail,
    userType,
    otp: otpHash,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  });

  // TODO: Send the plain OTP through your email service
  // await sendOtpEmail(normalizedEmail, otp);

  return {
    success: true,
    message: "OTP generated and saved successfully",
  };
};


export const superAdminVerifyOtpService = async (id, otp) => {
  if (!id || !otp) {
    throw new Error("OTP ID and OTP are required");
  }

  const otpRecord = await findOTPById(id);

  if (!otpRecord) {
    throw new Error("Invalid or already used OTP");
  }

  // Check expiration
  if (otpRecord.expiresAt <= new Date()) {
    throw new Error("OTP has expired");
  }

  // Verify OTP
  const isValid = verifyOTP(String(otp), otpRecord.otp);

  if (!isValid) {
    throw new Error("Invalid OTP");
  }

  // Mark OTP as used
  await markOTPAsUsed(otpRecord._id);

  return {
    success: true,
    message: "OTP verified successfully",
    email: otpRecord.email,
  };
};

export const superAdminLogoutService = async (id) => {

}

export const superAdminRefreshService = async () => {

}

// ===================

export const staffSendOtpService = async (email, password) => {

}

export const staffVerifyOtpService = async (email, password) => {

}

export const staffLogoutService = async (email, password) => {

}

export const staffRefreshService = async (email, password) => {

} 

// ====================

export const companySendOtpService = async (email, password) => {

}

export const companyVerifyOtpService = async (email, password) => {

}

export const companyLogoutService = async (email, password) => {

}

export const companyRefreshService = async (email, password) => {

}

// ====================

export const individualSendOtpService = async (email, password) => {

}

export const individualVerifyOtpService = async (email, password) => {

}

export const individualLogoutService = async (email, password) => {

}

export const individualRefreshService = async (email, password) => {

}   