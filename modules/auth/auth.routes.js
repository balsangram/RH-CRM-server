import express from "express";
import validate from "../../middlewares/validate.middleware.js";
import { loginEmailSchema, verifyOtpSchema } from "./auth.validator.js";
import {  companyLogout, companyRefresh, companySendOtp, companyVerifyOtp, individualLogout, individualRefresh, individualSendOtp, individualVerifyOtp, staffLogout, staffRefresh, staffSendOtp, staffVerifyOtp, superAdminLogout, superAdminRefresh, superAdminSendOtp, superAdminVerifyOtp } from "./auth.controller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

// Super Admin
router.post("/super-admin/send-otp", validate(loginEmailSchema), superAdminSendOtp);
router.post("/super-admin/verify-otp", validate(verifyOtpSchema), superAdminVerifyOtp);
router.post("/super-admin/logout", authenticate, superAdminLogout);
router.post("/super-admin/refresh", superAdminRefresh);

// Staff
router.post("/staff/send-otp", validate(loginEmailSchema), staffSendOtp);
router.post("/staff/verify-otp", validate(verifyOtpSchema), staffVerifyOtp);
router.post("/staff/logout", authenticate, staffLogout);
router.post("/staff/refresh", staffRefresh);

// Company
router.post("/company/send-otp", validate(loginEmailSchema), companySendOtp);
router.post("/company/verify-otp", validate(verifyOtpSchema), companyVerifyOtp);
router.post("/company/logout", authenticate, companyLogout);
router.post("/company/refresh", companyRefresh);

// Individual
router.post("/individual/send-otp", validate(loginEmailSchema), individualSendOtp);
router.post("/individual/verify-otp", validate(verifyOtpSchema), individualVerifyOtp);
router.post("/individual/logout", authenticate, individualLogout);
router.post("/individual/refresh", individualRefresh);

export default router;  