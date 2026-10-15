import { asyncHandler } from "../../utils/async-handler.js";
import response from "../../utils/response.util.js";
import {
  createCountryService,
  bulkCreateCountriesService,
  getAllCountriesService,
  getCountryByIdService,
  updateCountryService,
  deleteCountryService,
  createPackageService,
  getAllPackagesService,
  getPackageByIdService,
  updatePackageService,
  deletePackageService,
  getOutsiderPackagesService,
  getOutsiderPackageByIdService,
  getOutsiderCountriesService,
  getOutsiderCountryByIdService,
} from "./visa.service.js";

// ============================================================================
// Outsider Controllers (Public / For All Users)
// ============================================================================
export const getOutsiderPackages = asyncHandler(async (req, res) => {
  const result = await getOutsiderPackagesService(req.query);
  return response.success(res, result.message, result.data);
});

export const getOutsiderPackageById = asyncHandler(async (req, res) => {
  const result = await getOutsiderPackageByIdService(req.params.id);
  return response.success(res, result.message, result.data);
});

export const getOutsiderCountries = asyncHandler(async (req, res) => {
  const result = await getOutsiderCountriesService();
  return response.success(res, result.message, result.data);
});

export const getOutsiderCountryById = asyncHandler(async (req, res) => {
  const result = await getOutsiderCountryByIdService(req.params.id);
  return response.success(res, result.message, result.data);
});

// ============================================================================
// Visa Package Controllers (Admin / Staff)
// ============================================================================
export const createVisaPackage = asyncHandler(async (req, res) => {
  console.log("req", req.body)
  const result = await createPackageService(req.body);
  return response.created(res, result.message, result.data);
});

export const getAllVisaPackages = asyncHandler(async (req, res) => {
  const result = await getAllPackagesService(req.query);
  return response.success(res, result.message, result.data);
});

export const getVisaPackageById = asyncHandler(async (req, res) => {
  const result = await getPackageByIdService(req.params.id);
  return response.success(res, result.message, result.data);
});

export const updateVisaPackage = asyncHandler(async (req, res) => {
  const result = await updatePackageService(req.params.id, req.body);
  return response.success(res, result.message, result.data);
});

export const deleteVisaPackage = asyncHandler(async (req, res) => {
  const result = await deletePackageService(req.params.id);
  return response.success(res, result.message);
});

// ============================================================================
// Visa Country Controllers (Admin / Staff)
// ============================================================================
export const createVisaCountry = asyncHandler(async (req, res) => {
  const result = await createCountryService(req.body);
  return response.created(res, result.message, result.data);
});

export const bulkCreateVisaCountries = asyncHandler(async (req, res) => {
  const result = await bulkCreateCountriesService(req.body);
  return response.created(res, result.message, result.data);
});

export const getAllVisaCountries = asyncHandler(async (req, res) => {
  const result = await getAllCountriesService(req.query);
  return response.success(res, result.message, result.data);
});

export const getVisaCountryById = asyncHandler(async (req, res) => {
  const result = await getCountryByIdService(req.params.id, req.query);
  return response.success(res, result.message, result.data);
});

export const updateVisaCountry = asyncHandler(async (req, res) => {
  const result = await updateCountryService(req.params.id, req.body);
  return response.success(res, result.message, result.data);
});

export const deleteVisaCountry = asyncHandler(async (req, res) => {
  const result = await deleteCountryService(req.params.id);
  return response.success(res, result.message);
});

export default {
  getOutsiderPackages,
  getOutsiderPackageById,
  getOutsiderCountries,
  getOutsiderCountryById,
  createVisaPackage,
  getAllVisaPackages,
  getVisaPackageById,
  updateVisaPackage,
  deleteVisaPackage,
  createVisaCountry,
  bulkCreateVisaCountries,
  getAllVisaCountries,
  getVisaCountryById,
  updateVisaCountry,
  deleteVisaCountry,
};
