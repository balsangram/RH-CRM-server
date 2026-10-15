import BadRequestError from "../../shared/errors/bad-request.error.js";
import NotFoundError from "../../shared/errors/not-found.error.js";
import {
  createHolidayPackage,
  findHolidayPackageById,
  findHolidayPackageByPackageId,
  findAllHolidayPackages,
  updateHolidayPackage,
  deleteHolidayPackage,
} from "./holiday.repository.js";

// ============================================================================
// Holiday Package Services (Admin / Staff)
// ============================================================================
export const createHolidayPackageService = async (data) => {
  // Auto-generate packageId if not provided
  let packageId = data.packageId;
  if (!packageId) {
    packageId = `HP-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  }

  const existing = await findHolidayPackageByPackageId(packageId);
  if (existing) {
    throw new BadRequestError(`Holiday package with ID '${packageId}' already exists`);
  }

  const newPackage = await createHolidayPackage({
    ...data,
    packageId,
  });

  return {
    message: "Holiday package created successfully",
    data: newPackage,
  };
};

export const getAllHolidayPackagesService = async (query = {}) => {
  const filter = {};

  if (query.destination) {
    filter.destination = new RegExp(query.destination.trim(), "i");
  }
  if (query.countryOrRegion) {
    filter.countryOrRegion = new RegExp(query.countryOrRegion.trim(), "i");
  }
  if (query.minPrice || query.maxPrice) {
    filter.packagePrice = {};
    if (query.minPrice) filter.packagePrice.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.packagePrice.$lte = Number(query.maxPrice);
  }
  if (query.search) {
    filter.$or = [
      { packageName: new RegExp(query.search.trim(), "i") },
      { destination: new RegExp(query.search.trim(), "i") },
      { countryOrRegion: new RegExp(query.search.trim(), "i") },
    ];
  }

  const packages = await findAllHolidayPackages(filter);
  return {
    message: "Holiday packages retrieved successfully",
    data: packages,
  };
};

export const getHolidayPackageByIdService = async (id) => {
  const holidayPackage = await findHolidayPackageById(id);
  if (!holidayPackage) {
    throw new NotFoundError("Holiday package not found");
  }

  return {
    message: "Holiday package retrieved successfully",
    data: holidayPackage,
  };
};

export const updateHolidayPackageService = async (id, updateData) => {
  const existing = await findHolidayPackageById(id);
  if (!existing) {
    throw new NotFoundError("Holiday package not found");
  }

  if (updateData.packageId && updateData.packageId !== existing.packageId) {
    const duplicate = await findHolidayPackageByPackageId(updateData.packageId);
    if (duplicate && duplicate._id.toString() !== id) {
      throw new BadRequestError(`Package ID '${updateData.packageId}' is already in use`);
    }
  }

  const updated = await updateHolidayPackage(id, updateData);
  return {
    message: "Holiday package updated successfully",
    data: updated,
  };
};

export const deleteHolidayPackageService = async (id) => {
  const existing = await findHolidayPackageById(id);
  if (!existing) {
    throw new NotFoundError("Holiday package not found");
  }

  await deleteHolidayPackage(id);
  return {
    message: "Holiday package deleted successfully",
  };
};

// ============================================================================
// Outsider Holiday Package Services (Public / For all users)
// ============================================================================
export const getOutsiderHolidayPackagesService = async (query = {}) => {
  return await getAllHolidayPackagesService(query);
};

export const getOutsiderHolidayPackageByIdService = async (id) => {
  return await getHolidayPackageByIdService(id);
};

export default {
  createHolidayPackageService,
  getAllHolidayPackagesService,
  getHolidayPackageByIdService,
  updateHolidayPackageService,
  deleteHolidayPackageService,
  getOutsiderHolidayPackagesService,
  getOutsiderHolidayPackageByIdService,
};
