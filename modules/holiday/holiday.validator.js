import Joi from "joi";

const itineraryItemSchema = Joi.object({
  dayLabel: Joi.string().required().trim().messages({
    "any.required": "Day label is required (e.g. Day 1)",
  }),
  dayTitle: Joi.string().required().trim().messages({
    "any.required": "Day title is required (e.g. Arrival & City Tour)",
  }),
  dayActivityDetails: Joi.string().required().trim().messages({
    "any.required": "Day activity details are required",
  }),
});

export const createHolidayPackageSchema = Joi.object({
  packageId: Joi.string().optional().trim(),
  packageName: Joi.string().required().trim().messages({
    "any.required": "Package name is required",
    "string.empty": "Package name cannot be empty",
  }),
  countryOrRegion: Joi.string().required().trim().messages({
    "any.required": "Country or region is required",
    "string.empty": "Country or region cannot be empty",
  }),
  destination: Joi.string().required().trim().messages({
    "any.required": "Destination is required",
    "string.empty": "Destination cannot be empty",
  }),
  duration: Joi.string().required().trim().messages({
    "any.required": "Duration is required (e.g. 5 Days / 4 Nights)",
    "string.empty": "Duration cannot be empty",
  }),
  packagePrice: Joi.number().min(0).required().messages({
    "any.required": "Package price is required",
    "number.min": "Package price cannot be negative",
  }),
  tourOverviewAndDescription: Joi.string().required().trim().messages({
    "any.required": "Tour overview and description is required",
    "string.empty": "Tour overview cannot be empty",
  }),
  image: Joi.string().required().trim().messages({
    "any.required": "Main package image is required",
    "string.empty": "Image URL cannot be empty",
  }),
  images: Joi.array().items(Joi.string().trim()).optional().default([]),
  packageInclusions: Joi.array().items(Joi.string().trim()).optional().default([]),
  packageExclusions: Joi.array().items(Joi.string().trim()).optional().default([]),
  dayByDayItinerary: Joi.array().items(itineraryItemSchema).optional().default([]),
});

export const updateHolidayPackageSchema = Joi.object({
  packageId: Joi.string().optional().trim(),
  packageName: Joi.string().optional().trim(),
  countryOrRegion: Joi.string().optional().trim(),
  destination: Joi.string().optional().trim(),
  duration: Joi.string().optional().trim(),
  packagePrice: Joi.number().min(0).optional(),
  tourOverviewAndDescription: Joi.string().optional().trim(),
  image: Joi.string().optional().trim(),
  images: Joi.array().items(Joi.string().trim()).optional(),
  packageInclusions: Joi.array().items(Joi.string().trim()).optional(),
  packageExclusions: Joi.array().items(Joi.string().trim()).optional(),
  dayByDayItinerary: Joi.array().items(itineraryItemSchema).optional(),
});

export default {
  createHolidayPackageSchema,
  updateHolidayPackageSchema,
};
