import Joi from "joi";

// ============================================================================
// Visa Country Schemas
// ============================================================================
export const createVisaCountrySchema = Joi.object({
  countryName: Joi.string().required().trim().messages({
    "any.required": "Country name is required",
    "string.empty": "Country name cannot be empty",
  }),
  countryCode: Joi.string().uppercase().min(2).max(3).required().trim().messages({
    "any.required": "Country code is required (e.g. CA, AU)",
    "string.min": "Country code must be at least 2 characters",
    "string.max": "Country code cannot exceed 3 characters",
  }),
  flagEmoji: Joi.string().optional().allow("", null).trim().default(""),
  image: Joi.string().optional().allow("", null).trim().default(""),
  description: Joi.string().optional().allow("", null).trim().default(""),
  isActive: Joi.boolean().optional(),
});

export const updateVisaCountrySchema = Joi.object({
  countryName: Joi.string().optional().trim(),
  countryCode: Joi.string().uppercase().min(2).max(3).optional().trim(),
  flagEmoji: Joi.string().optional().allow("", null).trim(),
  image: Joi.string().optional().trim(),
  description: Joi.string().optional().allow("", null).trim(),
  isActive: Joi.boolean().optional(),
});

export const bulkCreateVisaCountrySchema = Joi.alternatives().try(
  Joi.array().items(createVisaCountrySchema).min(1).messages({
    "array.min": "At least one country must be provided in the array",
  }),
  Joi.object({
    countries: Joi.array().items(createVisaCountrySchema).min(1).required().messages({
      "any.required": "'countries' array is required",
      "array.min": "'countries' array must contain at least one country",
    }),
  })
);

// ============================================================================
// Visa Package Schemas
// ============================================================================
const documentRequirementItemSchema = Joi.object({
  documentName: Joi.string().required().trim(),
  requirementType: Joi.string()
    .valid("MANDATORY", "OPTIONAL", "ALTERNATIVE")
    .default("MANDATORY"),
  groupName: Joi.string().optional().allow(null, "").trim(),
  description: Joi.string().optional().allow("").trim(),
  guidelinesAndFormatInstructions: Joi.string().optional().allow("").trim(),
});

const documentGroupRuleItemSchema = Joi.object({
  groupName: Joi.string().required().trim(),
  minRequired: Joi.number().integer().min(1).required(),
  documents: Joi.array().items(Joi.string().trim()).default([]),
  ruleDescription: Joi.string().optional().allow("").trim(),
});

const costBreakdownItemSchema = Joi.object({
  visaFee: Joi.number().min(0).optional(),
  serviceFee: Joi.number().min(0).optional(),
  currency: Joi.string().optional().default("INR"),
  note: Joi.string().optional().allow(""),
});

const faqItemSchema = Joi.object({
  question: Joi.string().required().trim(),
  answer: Joi.string().required().trim(),
});

export const createVisaPackageSchema = Joi.object({
  country: Joi.string().hex().length(24).required().messages({
    "any.required": "Country ID is required",
    "string.hex": "Country ID must be a valid ObjectId",
  }),
  countryName: Joi.string().optional().trim(),
  countryCode: Joi.string().optional().uppercase().trim(),
  packageName: Joi.string().required().trim().messages({
    "any.required": "Package name is required",
  }),
  visaCategory: Joi.string().optional().trim(),
  visaType: Joi.string().optional().trim(),
  image: Joi.string().optional().allow("", null).trim().default(""),
  sideImages: Joi.array().items(Joi.string().trim()).optional().default([]),
  validityPeriod: Joi.string().required().trim().messages({
    "any.required": "Validity period is required",
  }),
  permittedStayDuration: Joi.string().required().trim().messages({
    "any.required": "Permitted stay duration is required",
  }),
  standardProcessingTime: Joi.string().required().trim().messages({
    "any.required": "Standard processing time is required",
  }),
  embassyStatus: Joi.string().optional().trim().default("Accepting Applications"),
  estimatedCost: Joi.number().min(0).required().messages({
    "any.required": "Estimated cost is required",
    "number.min": "Estimated cost cannot be negative",
  }),
  costBreakdown: costBreakdownItemSchema.optional(),

  // Eligibility Criteria
  qualification: Joi.array().items(Joi.string().trim()).optional().default([]),
  education: Joi.array().items(Joi.string().trim()).optional().default([]),
  job: Joi.array().items(Joi.string().trim()).optional().default([]),
  languageRequirement: Joi.array().items(Joi.string().trim()).optional().default([]),
  ageLimit: Joi.string().optional().allow(null, "").trim(),
  financialRequirements: Joi.string().optional().allow(null, "").trim(),
  eligibilityCriteria: Joi.array().items(Joi.string().trim()).optional().default([]),

  // Document Requirements & Rules
  documentRequirements: Joi.array().items(documentRequirementItemSchema).optional().default([]),
  documentGroupRules: Joi.array().items(documentGroupRuleItemSchema).optional().default([]),

  // Guidance and FAQs
  stepByStepGuidance: Joi.array().items(Joi.string().trim()).optional().default([]),
  faqs: Joi.array().items(faqItemSchema).optional().default([]),
  isActive: Joi.boolean().optional().default(true),
});

export const updateVisaPackageSchema = Joi.object({
  country: Joi.string().hex().length(24).optional(),
  countryName: Joi.string().optional().trim(),
  countryCode: Joi.string().optional().uppercase().trim(),
  packageName: Joi.string().optional().trim(),
  visaCategory: Joi.string().optional().trim(),
  visaType: Joi.string().optional().trim(),
  image: Joi.string().optional().trim(),
  sideImages: Joi.array().items(Joi.string().trim()).optional(),
  validityPeriod: Joi.string().optional().trim(),
  permittedStayDuration: Joi.string().optional().trim(),
  standardProcessingTime: Joi.string().optional().trim(),
  embassyStatus: Joi.string().optional().trim(),
  estimatedCost: Joi.number().min(0).optional(),
  costBreakdown: costBreakdownItemSchema.optional(),

  qualification: Joi.array().items(Joi.string().trim()).optional(),
  education: Joi.array().items(Joi.string().trim()).optional(),
  job: Joi.array().items(Joi.string().trim()).optional(),
  languageRequirement: Joi.array().items(Joi.string().trim()).optional(),
  ageLimit: Joi.string().optional().allow(null, "").trim(),
  financialRequirements: Joi.string().optional().allow(null, "").trim(),
  eligibilityCriteria: Joi.array().items(Joi.string().trim()).optional(),

  documentRequirements: Joi.array().items(documentRequirementItemSchema).optional(),
  documentGroupRules: Joi.array().items(documentGroupRuleItemSchema).optional(),

  stepByStepGuidance: Joi.array().items(Joi.string().trim()).optional(),
  faqs: Joi.array().items(faqItemSchema).optional(),
  isActive: Joi.boolean().optional(),
});

export default {
  createVisaCountrySchema,
  updateVisaCountrySchema,
  bulkCreateVisaCountrySchema,
  createVisaPackageSchema,
  updateVisaPackageSchema,
};
