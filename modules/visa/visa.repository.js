import mongoose from "mongoose";
import VisaCountry from "../../models/visaCountry.model.js";
import VisaPackage from "../../models/visaPackage.model.js";

// ============================================================================
// Visa Country Repository
// ============================================================================
export const createCountry = async (data) => {
  return await VisaCountry.create(data);
};

export const findCountryById = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const country = await VisaCountry.findById(id);
    if (country) return country;
  }
  return await VisaCountry.findOne({
    $or: [
      { countryCode: id.toString().trim().toUpperCase() },
      { countryName: new RegExp(`^${id.toString().trim()}$`, "i") },
    ],
  });
};

export const findCountryByName = async (countryName) => {
  return await VisaCountry.findOne({
    countryName: new RegExp(`^${countryName.trim()}$`, "i"),
  });
};

export const findCountryByCode = async (countryCode) => {
  return await VisaCountry.findOne({
    countryCode: countryCode.trim().toUpperCase(),
  });
};

export const findAllCountries = async (filter = {}) => {
  return await VisaCountry.find(filter).sort({ countryName: 1 });
};

export const updateCountry = async (id, updateData) => {
  return await VisaCountry.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteCountry = async (id) => {
  return await VisaCountry.findByIdAndDelete(id);
};

export const insertManyCountries = async (countries = []) => {
  return await VisaCountry.insertMany(countries);
};

export const findExistingCountries = async (names = [], codes = []) => {
  const nameRegexes = names.map((n) => new RegExp(`^${n.trim()}$`, "i"));
  return await VisaCountry.find({
    $or: [
      { countryName: { $in: nameRegexes } },
      { countryCode: { $in: codes.map((c) => c.trim().toUpperCase()) } },
    ],
  });
};

// ============================================================================
// Visa Package Repository
// ============================================================================
export const createPackage = async (data) => {
  return await VisaPackage.create(data);
};

export const findPackageById = async (id) => {
  return await VisaPackage.findById(id).populate("country");
};

export const findAllPackages = async (filter = {}, sort = { createdAt: -1 }) => {
  return await VisaPackage.find(filter).populate("country").sort(sort);
};

export const findActivePackages = async (filter = {}, sort = { createdAt: -1 }) => {
  return await VisaPackage.find({ ...filter, isActive: true })
    .populate("country")
    .sort(sort);
};

export const updatePackage = async (id, updateData) => {
  return await VisaPackage.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("country");
};

export const deletePackage = async (id) => {
  return await VisaPackage.findByIdAndDelete(id);
};

export const findPackagesByCountry = async (countryId, countryCode, filter = {}) => {
  const query = {
    $or: [
      { country: countryId },
      ...(countryCode ? [{ countryCode: countryCode.toUpperCase() }] : []),
    ],
    ...filter,
  };

  return await VisaPackage.find(query)
    .select(
      "_id country countryName countryCode packageName visaCategory visaType image validityPeriod permittedStayDuration standardProcessingTime embassyStatus estimatedCost costBreakdown isActive createdAt updatedAt"
    )
    .sort({ createdAt: -1 });
};

export default {
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
};
