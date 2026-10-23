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

/**
 * Helper to harmonize and auto-fill related fields in payload
 */
const preparePackagePayload = (data) => {
  const payload = { ...data };

  // Sync coverImage and image
  const coverImage = payload.coverImage || payload.image || "";
  if (coverImage) {
    payload.coverImage = coverImage;
    payload.image = coverImage;
  }

  // Sync tripOverview and tourOverviewAndDescription
  const tripOverview =
    payload.tripOverview || payload.tourOverviewAndDescription || "";
  if (tripOverview) {
    payload.tripOverview = tripOverview;
    payload.tourOverviewAndDescription = tripOverview;
  }

  // Sync detailedItinerary and dayByDayItinerary
  const itinerary = payload.detailedItinerary || payload.dayByDayItinerary || null;
  if (itinerary) {
    payload.detailedItinerary = itinerary;
    payload.dayByDayItinerary = itinerary;
  }

  // Sync inclusions and exclusions
  if (
    payload.inclusionsAndExclusions &&
    Array.isArray(payload.inclusionsAndExclusions) &&
    payload.inclusionsAndExclusions.length > 0
  ) {
    if (!payload.packageInclusions || payload.packageInclusions.length === 0) {
      payload.packageInclusions = payload.inclusionsAndExclusions
        .filter((item) => item.isIncluded)
        .map((item) => item.point);
    }
    if (!payload.packageExclusions || payload.packageExclusions.length === 0) {
      payload.packageExclusions = payload.inclusionsAndExclusions
        .filter((item) => !item.isIncluded)
        .map((item) => item.point);
    }
  } else if (
    (payload.packageInclusions && payload.packageInclusions.length > 0) ||
    (payload.packageExclusions && payload.packageExclusions.length > 0)
  ) {
    const incs = (payload.packageInclusions || []).map((point) => ({
      point,
      isIncluded: true,
      note: "",
    }));
    const excs = (payload.packageExclusions || []).map((point) => ({
      point,
      isIncluded: false,
      note: "",
    }));
    payload.inclusionsAndExclusions = [...incs, ...excs];
  }

  return payload;
};

// ============================================================================
// Holiday Package Services (Admin / Staff)
// ============================================================================
export const createHolidayPackageService = async (data) => {
  // Auto-generate packageId if not provided
  let packageId = data.packageId;
  if (!packageId) {
    packageId = `HP-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      100 + Math.random() * 900
    )}`;
  }

  const existing = await findHolidayPackageByPackageId(packageId);
  if (existing) {
    throw new BadRequestError(`Holiday package with ID '${packageId}' already exists`);
  }

  const payload = preparePackagePayload({
    ...data,
    packageId,
  });

  const newPackage = await createHolidayPackage(payload);

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
  if (query.tourType) {
    filter.tourType = new RegExp(query.tourType.trim(), "i");
  }
  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === "true" || query.isActive === true;
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
      { tourType: new RegExp(query.search.trim(), "i") },
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
    if (duplicate && duplicate._id.toString() !== existing._id.toString()) {
      throw new BadRequestError(`Package ID '${updateData.packageId}' is already in use`);
    }
  }

  const payload = preparePackagePayload(updateData);
  const updated = await updateHolidayPackage(existing._id, payload);

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

  await deleteHolidayPackage(existing._id);
  return {
    message: "Holiday package deleted successfully",
  };
};

// ============================================================================
// Outsider Holiday Package Services (Public / For all users)
// ============================================================================
export const getOutsiderHolidayPackagesService = async (query = {}) => {
  return await getAllHolidayPackagesService({
    ...query,
    isActive: true,
  });
};

export const getOutsiderHolidayPackageByIdService = async (id) => {
  const holidayPackage = await findHolidayPackageById(id);
  if (!holidayPackage || !holidayPackage.isActive) {
    throw new NotFoundError("Holiday package not found or currently unavailable");
  }

  return {
    message: "Holiday package retrieved successfully",
    data: holidayPackage,
  };
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
