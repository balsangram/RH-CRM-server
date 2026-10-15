import { asyncHandler } from "../../utils/async-handler.js";
import { companyLogoutService, companyRefreshService, companySendOtpService, companyVerifyOtpService, individualLogoutService, individualRefreshService, individualSendOtpService, individualVerifyOtpService, staffLogoutService, staffRefreshService, staffSendOtpService, staffVerifyOtpService, superAdminLogoutService, superAdminRefreshService, superAdminSendOtpService, superAdminVerifyOtpService } from "./auth.service.js";


export const superAdminSendOtp = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const result = await superAdminSendOtpService(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const superAdminVerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { id, otp } = req.body;
    const result = await superAdminVerifyOtpService(id, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const superAdminLogout = asyncHandler(async (req, res) => {
  try {
    const  id = req.user.id;
    const result = await superAdminLogoutService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

});

export const superAdminRefresh = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await superAdminRefreshService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ================================

export const staffSendOtp = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await staffSendOtpService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const staffVerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await staffVerifyOtpService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const staffLogout = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await staffLogoutService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const staffRefresh = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await staffRefreshService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ===========================================

export const companySendOtp = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await companySendOtpService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const companyVerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await companyVerifyOtpService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const companyLogout = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await companyLogoutService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const companyRefresh = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await companyRefreshService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ======================================

export const individualSendOtp = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await individualSendOtpService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const individualVerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await individualVerifyOtpService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const individualLogout = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await individualLogoutService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const individualRefresh = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await individualRefreshService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});