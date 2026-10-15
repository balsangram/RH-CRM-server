import { asyncHandler } from "../../utils/async-handler.js";
import response from "../../utils/response.util.js";
import {
  createHolidayPackageService,
  getAllHolidayPackagesService,
  getHolidayPackageByIdService,
  updateHolidayPackageService,
  deleteHolidayPackageService,
  getOutsiderHolidayPackagesService,
  getOutsiderHolidayPackageByIdService,
} from "./holiday.service.js";

// ============================================================================
// Outsider Controllers (Public / For all users)
// ============================================================================
export const getOutsiderHolidayPackages = asyncHandler(async (req, res) => {
  const result = await getOutsiderHolidayPackagesService(req.query);
  return response.success(res, result.message, result.data);
});

export const getOutsiderHolidayPackageById = asyncHandler(async (req, res) => {
  const result = await getOutsiderHolidayPackageByIdService(req.params.id);
  return response.success(res, result.message, result.data);
});

// ============================================================================
// Admin & Staff Controllers
// ============================================================================
export const createHolidayPackage = asyncHandler(async (req, res) => {
  const result = await createHolidayPackageService(req.body);
  return response.created(res, result.message, result.data);
});

export const getAllHolidayPackages = asyncHandler(async (req, res) => {
  const result = await getAllHolidayPackagesService(req.query);
  return response.success(res, result.message, result.data);
});

export const getHolidayPackageById = asyncHandler(async (req, res) => {
  const result = await getHolidayPackageByIdService(req.params.id);
  return response.success(res, result.message, result.data);
});

export const updateHolidayPackage = asyncHandler(async (req, res) => {
  const result = await updateHolidayPackageService(req.params.id, req.body);
  return response.success(res, result.message, result.data);
});

export const deleteHolidayPackage = asyncHandler(async (req, res) => {
  const result = await deleteHolidayPackageService(req.params.id);
  return response.success(res, result.message);
});

export default {
  getOutsiderHolidayPackages,
  getOutsiderHolidayPackageById,
  createHolidayPackage,
  getAllHolidayPackages,
  getHolidayPackageById,
  updateHolidayPackage,
  deleteHolidayPackage,
};
