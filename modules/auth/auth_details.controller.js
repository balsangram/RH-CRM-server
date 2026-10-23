import { asyncHandler } from "../../utils/async-handler.js";
import response from "../../utils/response.util.js";
import {
  getSuperAdminDetailsService,
  updateSuperAdminDetailsService,
  getStaffDetailsService,
  updateStaffDetailsService,
  getCompanyDetailsService,
  updateCompanyDetailsService,
  getTravelerDetailsService,
  updateTravelerDetailsService,
} from "./auth_details.services.js";

// ============================================================================
// Super Admin Controllers
// ============================================================================

export const getSuperAdminDetails = asyncHandler(async (req, res) => {
  const result = await getSuperAdminDetailsService(req.user.id);
  return response.success(res, result.message, result.data);
});

export const updateSuperAdminDetails = asyncHandler(async (req, res) => {
  const result = await updateSuperAdminDetailsService(req.user.id, req.body);
  return response.success(res, result.message, result.data);
});

// ============================================================================
// Staff Controllers
// ============================================================================

export const getStaffDetails = asyncHandler(async (req, res) => {
  const result = await getStaffDetailsService(req.user.id);
  return response.success(res, result.message, result.data);
});

export const updateStaffDetails = asyncHandler(async (req, res) => {
  const result = await updateStaffDetailsService(req.user.id, req.body);
  return response.success(res, result.message, result.data);
});

// ============================================================================
// Company Controllers
// ============================================================================

export const getCompanyDetails = asyncHandler(async (req, res) => {
  const result = await getCompanyDetailsService(req.user.id);
  return response.success(res, result.message, result.data);
});

export const updateCompanyDetails = asyncHandler(async (req, res) => {
  const result = await updateCompanyDetailsService(req.user.id, req.body);
  return response.success(res, result.message, result.data);
});

// ============================================================================
// Traveler Controllers
// ============================================================================

export const getTravelerDetails = asyncHandler(async (req, res) => {
  const result = await getTravelerDetailsService(req.user.id);
  return response.success(res, result.message, result.data);
});

export const updateTravelerDetails = asyncHandler(async (req, res) => {
  const result = await updateTravelerDetailsService(req.user.id, req.body);
  return response.success(res, result.message, result.data);
});

export default {
  getSuperAdminDetails,
  updateSuperAdminDetails,
  getStaffDetails,
  updateStaffDetails,
  getCompanyDetails,
  updateCompanyDetails,
  getTravelerDetails,
  updateTravelerDetails,
};
