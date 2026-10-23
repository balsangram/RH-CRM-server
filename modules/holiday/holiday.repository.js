import mongoose from "mongoose";
import HolidayPackage from "../../models/holidayPackage.model.js";

export const createHolidayPackage = async (data) => {
  return await HolidayPackage.create(data);
};

export const findHolidayPackageById = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const pkg = await HolidayPackage.findById(id);
    if (pkg) return pkg;
  }
  return await HolidayPackage.findOne({
    $or: [
      { packageId: id.toString().trim() },
      { packageName: new RegExp(`^${id.toString().trim()}$`, "i") },
    ],
  });
};

export const findHolidayPackageByPackageId = async (packageId) => {
  return await HolidayPackage.findOne({
    packageId: packageId.trim(),
  });
};

export const findAllHolidayPackages = async (filter = {}, sort = { createdAt: -1 }) => {
  return await HolidayPackage.find(filter).sort(sort);
};

export const updateHolidayPackage = async (id, updateData) => {
  return await HolidayPackage.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteHolidayPackage = async (id) => {
  return await HolidayPackage.findByIdAndDelete(id);
};

export default {
  createHolidayPackage,
  findHolidayPackageById,
  findHolidayPackageByPackageId,
  findAllHolidayPackages,
  updateHolidayPackage,
  deleteHolidayPackage,
};
