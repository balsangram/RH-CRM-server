import Joi from "joi";
import {
  COMPANY_STATUS,
  COMPANY_STATUS_LIST,
  ALLOWED_SORT_FIELDS,
} from "./company.constants.js";

// International phone number regex (supports optional +, country code, spaces, dashes, 7-15 digits)
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

/**
 * Validation schema for creating a new company
 */
export const createCompanySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(120)
    .required()
    .messages({
      "any.required": "Company name is required",
      "string.empty": "Company name cannot be empty",
      "string.min": "Company name must be at least 2 characters long",
      "string.max": "Company name cannot exceed 120 characters",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .max(100)
    .required()
    .messages({
      "any.required": "Company email is required",
      "string.empty": "Company email cannot be empty",
      "string.email": "Please provide a valid company email address (e.g. info@company.com)",
      "string.max": "Company email cannot exceed 100 characters",
    }),

  phone: Joi.string()
    .trim()
    .pattern(phoneRegex)
    .optional()
    .allow("", null)
    .messages({
      "string.pattern.base": "Please provide a valid contact number (7 to 15 digits with optional country code, e.g. +91 9876543210)",
    }),

  address: Joi.string()
    .trim()
    .max(300)
    .optional()
    .allow("", null)
    .messages({
      "string.max": "Address cannot exceed 300 characters",
    }),

  status: Joi.string()
    .trim()
    .lowercase()
    .valid(...COMPANY_STATUS_LIST)
    .default(COMPANY_STATUS.ACTIVE)
    .optional()
    .allow("", null)
    .messages({
      "any.only": `Status must be one of: ${COMPANY_STATUS_LIST.join(", ")}`,
    }),

  logo: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow("", null)
    .messages({
      "string.max": "Logo path or URL cannot exceed 500 characters",
    }),

  contactPersonName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .allow("", null)
    .messages({
      "string.min": "Contact person name must be at least 2 characters long",
      "string.max": "Contact person name cannot exceed 100 characters",
    }),

  regDetails: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow("", null)
    .messages({
      "string.max": "Registration details cannot exceed 100 characters",
    }),

  country: Joi.string()
    .trim()
    .min(2)
    .max(80)
    .optional()
    .allow("", null)
    .messages({
      "string.min": "Country name must be at least 2 characters long",
      "string.max": "Country name cannot exceed 80 characters",
    }),
});

/**
 * Validation schema for updating an existing company
 */
export const updateCompanySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(120)
    .optional()
    .messages({
      "string.empty": "Company name cannot be empty",
      "string.min": "Company name must be at least 2 characters long",
      "string.max": "Company name cannot exceed 120 characters",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .max(100)
    .optional()
    .messages({
      "string.empty": "Company email cannot be empty",
      "string.email": "Please provide a valid company email address",
      "string.max": "Company email cannot exceed 100 characters",
    }),

  phone: Joi.string()
    .trim()
    .pattern(phoneRegex)
    .optional()
    .allow("", null)
    .messages({
      "string.pattern.base": "Please provide a valid contact number (7 to 15 digits, optional + country code)",
    }),

  address: Joi.string()
    .trim()
    .max(300)
    .optional()
    .allow("", null)
    .messages({
      "string.max": "Address cannot exceed 300 characters",
    }),

  status: Joi.string()
    .trim()
    .lowercase()
    .valid(...COMPANY_STATUS_LIST)
    .optional()
    .allow("", null)
    .messages({
      "any.only": `Status must be one of: ${COMPANY_STATUS_LIST.join(", ")}`,
    }),

  logo: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow("", null)
    .messages({
      "string.max": "Logo path or URL cannot exceed 500 characters",
    }),

  contactPersonName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .allow("", null)
    .messages({
      "string.min": "Contact person name must be at least 2 characters long",
      "string.max": "Contact person name cannot exceed 100 characters",
    }),

  regDetails: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow("", null)
    .messages({
      "string.max": "Registration details cannot exceed 100 characters",
    }),

  country: Joi.string()
    .trim()
    .min(2)
    .max(80)
    .optional()
    .allow("", null)
    .messages({
      "string.min": "Country name must be at least 2 characters long",
      "string.max": "Country name cannot exceed 80 characters",
    }),
});

/**
 * Validation schema for company query, filter, search and sort
 */
export const getCompaniesQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      "number.base": "Page must be a valid number",
      "number.min": "Page must be greater than or equal to 1",
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      "number.base": "Limit must be a valid number",
      "number.min": "Limit must be at least 1",
      "number.max": "Limit cannot exceed 100",
    }),

  search: Joi.string().trim().optional().allow("", null),
  q: Joi.string().trim().optional().allow("", null),

  status: Joi.string()
    .trim()
    .lowercase()
    .valid(...COMPANY_STATUS_LIST, "all")
    .optional()
    .allow("", null)
    .messages({
      "any.only": `Status filter must be one of: ${COMPANY_STATUS_LIST.join(", ")}, or all`,
    }),

  phone: Joi.string().trim().optional().allow("", null),
  contactNo: Joi.string().trim().optional().allow("", null),
  email: Joi.string().trim().optional().allow("", null),
  country: Joi.string().trim().optional().allow("", null),
  regDetails: Joi.string().trim().optional().allow("", null),
  registrationDetails: Joi.string().trim().optional().allow("", null),
  name: Joi.string().trim().optional().allow("", null),
  contactPersonName: Joi.string().trim().optional().allow("", null),

  sortBy: Joi.string()
    .valid(...ALLOWED_SORT_FIELDS)
    .optional()
    .allow("", null)
    .default("createdAt")
    .messages({
      "any.only": `sortBy must be one of: ${ALLOWED_SORT_FIELDS.join(", ")}`,
    }),

  sortOrder: Joi.string()
    .valid("asc", "desc", "1", "-1")
    .optional()
    .allow("", null)
    .default("desc")
    .messages({
      "any.only": "sortOrder must be 'asc', 'desc', '1', or '-1'",
    }),
}).unknown(true);

export default {
  createCompanySchema,
  updateCompanySchema,
  getCompaniesQuerySchema,
};
