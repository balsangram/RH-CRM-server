import SuperAdmin from "../../models/superAdmin.model.js";
import SubAdmin from "../../models/subAdmin.model.js";
import Company from "../../models/company.model.js";
import Traveler from "../../models/traveler.model.js";

const EXCLUDE_TOKENS = "-accessToken -refreshToken";

// ============================================================================
// Super Admin Repository Functions
// ============================================================================

export const findSuperAdminById = async (id) => {
  return await SuperAdmin.findById(id).select(EXCLUDE_TOKENS);
};

export const findSuperAdminByEmail = async (email) => {
  return await SuperAdmin.findOne({ email: email.toLowerCase().trim() });
};

export const updateSuperAdminById = async (id, updateData) => {
  return await SuperAdmin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select(EXCLUDE_TOKENS);
};

// ============================================================================
// Staff (SubAdmin) Repository Functions
// ============================================================================

export const findStaffById = async (id) => {
  return await SubAdmin.findById(id).select(EXCLUDE_TOKENS);
};

export const findStaffByEmail = async (email) => {
  return await SubAdmin.findOne({ email: email.toLowerCase().trim() });
};

export const updateStaffById = async (id, updateData) => {
  return await SubAdmin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select(EXCLUDE_TOKENS);
};

// ============================================================================
// Company Repository Functions
// ============================================================================

export const findCompanyById = async (id) => {
  return await Company.findById(id).select(EXCLUDE_TOKENS);
};

export const findCompanyByEmail = async (email) => {
  return await Company.findOne({ email: email.toLowerCase().trim() });
};

export const updateCompanyById = async (id, updateData) => {
  return await Company.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select(EXCLUDE_TOKENS);
};

// ============================================================================
// Traveler Repository Functions
// ============================================================================

export const findTravelerById = async (id) => {
  return await Traveler.findById(id).select(EXCLUDE_TOKENS);
};

export const findTravelerByEmail = async (email) => {
  return await Traveler.findOne({ email: email.toLowerCase().trim() });
};

export const updateTravelerById = async (id, updateData) => {
  return await Traveler.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select(EXCLUDE_TOKENS);
};

export default {
  findSuperAdminById,
  findSuperAdminByEmail,
  updateSuperAdminById,
  findStaffById,
  findStaffByEmail,
  updateStaffById,
  findCompanyById,
  findCompanyByEmail,
  updateCompanyById,
  findTravelerById,
  findTravelerByEmail,
  updateTravelerById,
};
