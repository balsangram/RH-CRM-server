import express from "express";
import validate from "../../middlewares/validate.middleware.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import {
  loginEmailSchema,
  verifyOtpSchema,
  refreshTokenSchema,
} from "./auth.validator.js";
import {
  superAdminSendOtp,
  superAdminVerifyOtp,
  superAdminLogout,
  superAdminRefresh,
  staffSendOtp,
  staffVerifyOtp,
  staffLogout,
  staffRefresh,
  companySendOtp,
  companyVerifyOtp,
  companyLogout,
  companyRefresh,
  travelerSendOtp,
  travelerVerifyOtp,
  travelerLogout,
  travelerRefresh,
  insiderSendOtp,
  insiderVerifyOtp,
  insiderLogout,
  insiderRefresh,
  outsiderSendOtp,
  outsiderVerifyOtp,
  outsiderLogout,
  outsiderRefresh,
} from "./auth.controller.js";
import Roles from "../../shared/constants/roles.constants.js";
import { uploadS3Image } from "../../middlewares/upload.middleware.js";
import {
  updateSuperAdminSchema,
  updateStaffSchema,
  updateCompanyDetailsSchema,
  updateTravelerSchema,
} from "./auth.validator.js";
import {
  getSuperAdminDetails,
  updateSuperAdminDetails,
  getStaffDetails,
  updateStaffDetails,
  getCompanyDetails,
  updateCompanyDetails,
  getTravelerDetails,
  updateTravelerDetails,
} from "./auth_details.controller.js";
import authorize from "../../middlewares/authorize.middleware.js";

const router = express.Router();

// ============================================================================
// Super Admin Routes (Connected to SuperAdmin Model)
// ============================================================================
router.post("/super-admin/send-otp", validate(loginEmailSchema), superAdminSendOtp);
router.post("/super-admin/verify-otp", validate(verifyOtpSchema), superAdminVerifyOtp);
router.post("/super-admin/logout", authenticate, superAdminLogout);
router.post("/super-admin/refresh", validate(refreshTokenSchema), superAdminRefresh);

router.get("/super-admin/profile", authenticate, authorize(Roles.SUPER_ADMIN), getSuperAdminDetails);
router.patch(
  "/super-admin/profile",
  authenticate,
  authorize(Roles.SUPER_ADMIN),
  uploadS3Image("profileImage", "super-admins"),
  validate(updateSuperAdminSchema),
  updateSuperAdminDetails
);

// ============================================================================
// Staff Routes (Connected to SubAdmin Model)
// ============================================================================
router.post("/staff/send-otp", validate(loginEmailSchema), staffSendOtp);
router.post("/staff/verify-otp", validate(verifyOtpSchema), staffVerifyOtp);
router.post("/staff/logout", authenticate, staffLogout);
router.post("/staff/refresh", validate(refreshTokenSchema), staffRefresh);

router.get("/staff/profile", authenticate, authorize(Roles.STAFF), getStaffDetails);
router.patch(
  "/staff/profile",
  authenticate,
  authorize(Roles.STAFF),
  uploadS3Image("profileImage", "staff"),
  validate(updateStaffSchema),
  updateStaffDetails
);

// ============================================================================
// Company Routes (Connected to Company Model)
// ============================================================================
router.post("/company/send-otp", validate(loginEmailSchema), companySendOtp);
router.post("/company/verify-otp", validate(verifyOtpSchema), companyVerifyOtp);
router.post("/company/logout", authenticate, companyLogout);
router.post("/company/refresh", validate(refreshTokenSchema), companyRefresh);

router.get("/company/profile", authenticate, authorize(Roles.COMPANY), getCompanyDetails);
router.patch(
  "/company/profile",
  authenticate,
  authorize(Roles.COMPANY),
  uploadS3Image("logo", "companies"),
  validate(updateCompanyDetailsSchema),
  updateCompanyDetails
);

// ============================================================================
// Traveler Routes (Connected to Traveler Model)
// ============================================================================
router.post("/traveler/send-otp", validate(loginEmailSchema), travelerSendOtp);
router.post("/traveler/verify-otp", validate(verifyOtpSchema), travelerVerifyOtp);
router.post("/traveler/logout", authenticate, travelerLogout);
router.post("/traveler/refresh", validate(refreshTokenSchema), travelerRefresh);

router.get("/traveler/profile", authenticate, authorize(Roles.TRAVELER), getTravelerDetails);
router.patch(
  "/traveler/profile",
  authenticate,
  authorize(Roles.TRAVELER),
  uploadS3Image("profileImage", "travelers"),
  validate(updateTravelerSchema),
  updateTravelerDetails
);

// ============================================================================
// Insider Routes (Super Admin & Staff access)
// ============================================================================
router.post("/insider/send-otp", validate(loginEmailSchema), insiderSendOtp);
router.post("/insider/verify-otp", validate(verifyOtpSchema), insiderVerifyOtp);
router.post("/insider/logout", authenticate, insiderLogout);
router.post("/insider/refresh", validate(refreshTokenSchema), insiderRefresh);

// ============================================================================
// Outsider Routes (Company & Traveler access)
// ============================================================================
router.post("/outsider/send-otp", validate(loginEmailSchema), outsiderSendOtp);
router.post("/outsider/verify-otp", validate(verifyOtpSchema), outsiderVerifyOtp);
router.post("/outsider/logout", authenticate, outsiderLogout);
router.post("/outsider/refresh", validate(refreshTokenSchema), outsiderRefresh);

export default router;