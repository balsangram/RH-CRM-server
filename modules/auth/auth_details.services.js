import BadRequestError from "../../shared/errors/bad-request.error.js";
import NotFoundError from "../../shared/errors/not-found.error.js";
import {
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
} from "./auth_details.repositories.js";

// ============================================================================
// Super Admin Services
// ============================================================================

export const getSuperAdminDetailsService = async (userId) => {
  const superAdmin = await findSuperAdminById(userId);
  if (!superAdmin) {
    throw new NotFoundError("Super Admin profile not found");
  }
  return {
    message: "Super Admin details fetched successfully",
    data: superAdmin,
  };
};

export const updateSuperAdminDetailsService = async (userId, updatePayload) => {
  const existing = await findSuperAdminById(userId);
  if (!existing) {
    throw new NotFoundError("Super Admin profile not found");
  }

  const { name, email, phone, profileImage } = updatePayload;
  const updateData = {};

  if (name !== undefined) updateData.name = name.trim();
  if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
  if (profileImage !== undefined) updateData.profileImage = profileImage;

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== existing.email) {
      const emailInUse = await findSuperAdminByEmail(normalizedEmail);
      if (emailInUse && emailInUse._id.toString() !== userId.toString()) {
        throw new BadRequestError("This email address is already in use by another account");
      }
      updateData.email = normalizedEmail;
    }
  }

  const updatedSuperAdmin = await updateSuperAdminById(userId, updateData);
  return {
    message: "Super Admin profile updated successfully",
    data: updatedSuperAdmin,
  };
};

// ============================================================================
// Staff Services
// ============================================================================

export const getStaffDetailsService = async (userId) => {
  const staff = await findStaffById(userId);
  if (!staff) {
    throw new NotFoundError("Staff profile not found");
  }
  return {
    message: "Staff details fetched successfully",
    data: staff,
  };
};

export const updateStaffDetailsService = async (userId, updatePayload) => {
  const existing = await findStaffById(userId);
  if (!existing) {
    throw new NotFoundError("Staff profile not found");
  }

  const { name, email, phone, profileImage } = updatePayload;
  const updateData = {};

  if (name !== undefined) updateData.name = name.trim();
  if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
  if (profileImage !== undefined) updateData.profileImage = profileImage;

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== existing.email) {
      const emailInUse = await findStaffByEmail(normalizedEmail);
      if (emailInUse && emailInUse._id.toString() !== userId.toString()) {
        throw new BadRequestError("This email address is already in use by another account");
      }
      updateData.email = normalizedEmail;
    }
  }

  const updatedStaff = await updateStaffById(userId, updateData);
  return {
    message: "Staff profile updated successfully",
    data: updatedStaff,
  };
};

// ============================================================================
// Company Services
// ============================================================================

export const getCompanyDetailsService = async (userId) => {
  const company = await findCompanyById(userId);
  if (!company) {
    throw new NotFoundError("Company profile not found");
  }
  return {
    message: "Company details fetched successfully",
    data: company,
  };
};

export const updateCompanyDetailsService = async (userId, updatePayload) => {
  const existing = await findCompanyById(userId);
  if (!existing) {
    throw new NotFoundError("Company profile not found");
  }

  const {
    name,
    email,
    phone,
    address,
    logo,
    contactPersonName,
    regDetails,
    country,
  } = updatePayload;

  const updateData = {};

  if (name !== undefined) updateData.name = name.trim();
  if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
  if (address !== undefined) updateData.address = address ? address.trim() : null;
  if (logo !== undefined) updateData.logo = logo;
  if (contactPersonName !== undefined) updateData.contactPersonName = contactPersonName ? contactPersonName.trim() : null;
  if (regDetails !== undefined) updateData.regDetails = regDetails ? regDetails.trim() : null;
  if (country !== undefined) updateData.country = country ? country.trim() : null;

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== existing.email) {
      const emailInUse = await findCompanyByEmail(normalizedEmail);
      if (emailInUse && emailInUse._id.toString() !== userId.toString()) {
        throw new BadRequestError("This email address is already in use by another company");
      }
      updateData.email = normalizedEmail;
    }
  }

  const updatedCompany = await updateCompanyById(userId, updateData);
  return {
    message: "Company profile updated successfully",
    data: updatedCompany,
  };
};

// ============================================================================
// Traveler Services
// ============================================================================

export const getTravelerDetailsService = async (userId) => {
  const traveler = await findTravelerById(userId);
  if (!traveler) {
    throw new NotFoundError("Traveler profile not found");
  }
  return {
    message: "Traveler details fetched successfully",
    data: traveler,
  };
};

export const updateTravelerDetailsService = async (userId, updatePayload) => {
  const existing = await findTravelerById(userId);
  if (!existing) {
    throw new NotFoundError("Traveler profile not found");
  }

  const { name, email, phone, profileImage } = updatePayload;
  const updateData = {};

  if (name !== undefined) updateData.name = name.trim();
  if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
  if (profileImage !== undefined) updateData.profileImage = profileImage;

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== existing.email) {
      const emailInUse = await findTravelerByEmail(normalizedEmail);
      if (emailInUse && emailInUse._id.toString() !== userId.toString()) {
        throw new BadRequestError("This email address is already in use by another traveler");
      }
      updateData.email = normalizedEmail;
    }
  }

  const updatedTraveler = await updateTravelerById(userId, updateData);
  return {
    message: "Traveler profile updated successfully",
    data: updatedTraveler,
  };
};

export default {
  getSuperAdminDetailsService,
  updateSuperAdminDetailsService,
  getStaffDetailsService,
  updateStaffDetailsService,
  getCompanyDetailsService,
  updateCompanyDetailsService,
  getTravelerDetailsService,
  updateTravelerDetailsService,
};
