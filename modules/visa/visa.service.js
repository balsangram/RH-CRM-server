import BadRequestError from "../../shared/errors/bad-request.error.js";
import NotFoundError from "../../shared/errors/not-found.error.js";
import {
  createCountry,
  findCountryById,
  findCountryByName,
  findCountryByCode,
  findAllCountries,
  updateCountry,
  deleteCountry,
  insertManyCountries,
  findExistingCountries,
  findPackagesByCountry,
  createPackage,
  findPackageById,
  findAllPackages,
  findActivePackages,
  updatePackage,
  deletePackage,
} from "./visa.repository.js";

// ============================================================================
// Visa Country Services
// ============================================================================
export const createCountryService = async (data) => {
  const existingByName = await findCountryByName(data.countryName);
  if (existingByName) {
    throw new BadRequestError(`Country with name '${data.countryName}' already exists`);
  }

  const existingByCode = await findCountryByCode(data.countryCode);
  if (existingByCode) {
    throw new BadRequestError(`Country with code '${data.countryCode}' already exists`);
  }

  const country = await createCountry(data);
  return {
    message: "Visa country created successfully",
    data: country,
  };
};

export const bulkCreateCountriesService = async (payload) => {
  const items = Array.isArray(payload) ? payload : payload?.countries;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new BadRequestError("At least one country must be provided");
  }

  // Deduplicate within the payload itself
  const seenNames = new Set();
  const seenCodes = new Set();
  const uniqueItems = [];

  for (const item of items) {
    const normName = item.countryName?.trim().toLowerCase();
    const normCode = item.countryCode?.trim().toUpperCase();

    if (!normName || !normCode) continue;

    if (seenNames.has(normName) || seenCodes.has(normCode)) {
      continue;
    }
    seenNames.add(normName);
    seenCodes.add(normCode);
    uniqueItems.push({
      countryName: item.countryName.trim(),
      countryCode: normCode,
      flagEmoji: item.flagEmoji?.trim() || "",
      image: item.image?.trim() || "",
      description: item.description?.trim() || "",
      isActive: item.isActive !== undefined ? Boolean(item.isActive) : false,
    });
  }

  if (uniqueItems.length === 0) {
    throw new BadRequestError("No valid country items found in the payload");
  }

  // Query existing countries in DB
  const names = uniqueItems.map((u) => u.countryName);
  const codes = uniqueItems.map((u) => u.countryCode);
  const existingCountries = await findExistingCountries(names, codes);

  const existingNameSet = new Set(
    existingCountries.map((c) => c.countryName.toLowerCase())
  );
  const existingCodeSet = new Set(
    existingCountries.map((c) => c.countryCode.toUpperCase())
  );

  const toInsert = uniqueItems.filter(
    (item) =>
      !existingNameSet.has(item.countryName.toLowerCase()) &&
      !existingCodeSet.has(item.countryCode.toUpperCase())
  );

  const skipped = uniqueItems.filter(
    (item) =>
      existingNameSet.has(item.countryName.toLowerCase()) ||
      existingCodeSet.has(item.countryCode.toUpperCase())
  );

  let inserted = [];
  if (toInsert.length > 0) {
    inserted = await insertManyCountries(toInsert);
  }

  return {
    message: `Processed ${items.length} countries: ${inserted.length} created, ${skipped.length} skipped (already exist)`,
    data: {
      insertedCount: inserted.length,
      skippedCount: skipped.length,
      inserted,
      skipped: skipped.map((s) => ({
        countryName: s.countryName,
        countryCode: s.countryCode,
      })),
    },
  };
};

export const getAllCountriesService = async (query = {}) => {
  const filter = {};
  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === "true" || query.isActive === true;
  }
  const countries = await findAllCountries(filter);
  return {
    message: "Countries fetched successfully",
    data: countries,
  };
};

export const getCountryByIdService = async (id, query = {}) => {
  const country = await findCountryById(id);
  if (!country) {
    throw new NotFoundError("Visa country not found");
  }

  const packageFilter = {};
  if (query.isActive !== undefined) {
    packageFilter.isActive = query.isActive === "true" || query.isActive === true;
  }

  const packages = await findPackagesByCountry(
    country._id,
    country.countryCode,
    packageFilter
  );

  const countryObj = country.toObject ? country.toObject() : country;

  return {
    message: "Country fetched successfully",
    data: {
      ...countryObj,
      totalPackages: packages.length,
      packagesCount: packages.length,
      packages,
    },
  };
};

export const updateCountryService = async (id, updateData) => {
  const country = await findCountryById(id);
  if (!country) {
    throw new NotFoundError("Visa country not found");
  }

  if (updateData.countryName && updateData.countryName !== country.countryName) {
    const existing = await findCountryByName(updateData.countryName);
    if (existing && existing._id.toString() !== id) {
      throw new BadRequestError(`Country name '${updateData.countryName}' is already taken`);
    }
  }

  if (updateData.countryCode && updateData.countryCode !== country.countryCode) {
    const existing = await findCountryByCode(updateData.countryCode);
    if (existing && existing._id.toString() !== id) {
      throw new BadRequestError(`Country code '${updateData.countryCode}' is already taken`);
    }
  }

  const updated = await updateCountry(id, updateData);
  return {
    message: "Visa country updated successfully",
    data: updated,
  };
};

export const deleteCountryService = async (id) => {
  const country = await findCountryById(id);
  if (!country) {
    throw new NotFoundError("Visa country not found");
  }

  await deleteCountry(id);
  return {
    message: "Visa country deleted successfully",
  };
};

// ============================================================================
// Visa Package Services (Admin & Staff)
// ============================================================================
export const createPackageService = async (data) => {
  const country = await findCountryById(data.country);
  if (!country) {
    throw new NotFoundError("Associated visa country not found");
  }

  // Auto-fill country name, code, and sync visaCategory/visaType
  const visaCategory = data.visaCategory || data.visaType || "General Visa";
  const visaType = data.visaType || data.visaCategory || "General Visa";

  let document = data.document || "";
  let documents = Array.isArray(data.documents) ? data.documents : [];
  if (document && documents.length === 0) {
    documents = [document];
  } else if (!document && documents.length > 0) {
    document = documents[0];
  }

  const packagePayload = {
    ...data,
    visaCategory,
    visaType,
    document,
    documents,
    countryName: country.countryName,
    countryCode: country.countryCode,
  };

  const newPackage = await createPackage(packagePayload);
  return {
    message: "Visa package created successfully",
    data: newPackage,
  };
};

export const getAllPackagesService = async (query = {}) => {
  const filter = {};

  if (query.country) {
    filter.country = query.country;
  }
  if (query.countryCode) {
    filter.countryCode = query.countryCode.toUpperCase();
  }
  if (query.visaCategory) {
    filter.visaCategory = new RegExp(query.visaCategory.trim(), "i");
  }
  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === "true" || query.isActive === true;
  }
  if (query.search) {
    filter.$or = [
      { packageName: new RegExp(query.search.trim(), "i") },
      { countryName: new RegExp(query.search.trim(), "i") },
      { visaCategory: new RegExp(query.search.trim(), "i") },
    ];
  }

  const packages = await findAllPackages(filter);
  return {
    message: "Visa packages retrieved successfully",
    data: packages,
  };
};

export const getPackageByIdService = async (id) => {
  const visaPackage = await findPackageById(id);
  if (!visaPackage) {
    throw new NotFoundError("Visa package not found");
  }
  return {
    message: "Visa package retrieved successfully",
    data: visaPackage,
  };
};

export const updatePackageService = async (id, updateData) => {
  const existing = await findPackageById(id);
  if (!existing) {
    throw new NotFoundError("Visa package not found");
  }

  if (updateData.country) {
    const country = await findCountryById(updateData.country);
    if (!country) {
      throw new NotFoundError("Referenced visa country not found");
    }
    updateData.countryName = country.countryName;
    updateData.countryCode = country.countryCode;
  }

  if (updateData.document || updateData.documents) {
    let document = updateData.document || "";
    let documents = Array.isArray(updateData.documents) ? updateData.documents : [];
    if (document && documents.length === 0) {
      updateData.documents = [document];
    } else if (!document && documents.length > 0) {
      updateData.document = documents[0];
    }
  }

  const updated = await updatePackage(id, updateData);
  return {
    message: "Visa package updated successfully",
    data: updated,
  };
};

export const deletePackageService = async (id) => {
  const existing = await findPackageById(id);
  if (!existing) {
    throw new NotFoundError("Visa package not found");
  }

  await deletePackage(id);
  return {
    message: "Visa package deleted successfully",
  };
};

// ============================================================================
// Outsider Services (Public / For all users & visitors)
// ============================================================================
export const getOutsiderPackagesService = async (query = {}) => {
  const filter = { isActive: true };

  if (query.country) {
    filter.country = query.country;
  }
  if (query.countryCode) {
    filter.countryCode = query.countryCode.toUpperCase();
  }
  if (query.visaCategory) {
    filter.visaCategory = new RegExp(query.visaCategory.trim(), "i");
  }
  if (query.search) {
    filter.$or = [
      { packageName: new RegExp(query.search.trim(), "i") },
      { countryName: new RegExp(query.search.trim(), "i") },
      { visaCategory: new RegExp(query.search.trim(), "i") },
    ];
  }

  const packages = await findActivePackages(filter);
  return {
    message: "Active visa packages retrieved successfully",
    data: packages,
  };
};

export const getOutsiderPackageByIdService = async (id) => {
  const visaPackage = await findPackageById(id);
  if (!visaPackage || !visaPackage.isActive) {
    throw new NotFoundError("Visa package not found or currently unavailable");
  }

  return {
    message: "Visa package retrieved successfully",
    data: visaPackage,
  };
};

export const getOutsiderCountriesService = async () => {
  const countries = await findAllCountries({ isActive: true });
  return {
    message: "Active visa countries retrieved successfully",
    data: countries,
  };
};

export const getOutsiderCountryByIdService = async (id) => {
  const country = await findCountryById(id);
  if (!country || !country.isActive) {
    throw new NotFoundError("Visa country not found or currently inactive");
  }

  const packages = await findPackagesByCountry(
    country._id,
    country.countryCode,
    { isActive: true }
  );

  const countryObj = country.toObject ? country.toObject() : country;

  return {
    message: "Active country and packages retrieved successfully",
    data: {
      ...countryObj,
      totalPackages: packages.length,
      packagesCount: packages.length,
      packages,
    },
  };
};

export default {
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
};
