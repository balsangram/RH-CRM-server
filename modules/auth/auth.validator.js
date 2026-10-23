import Joi from 'joi';

export const loginEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
});

export const verifyOtpSchema = Joi.object({
  id: Joi.string().messages({
    'string.empty': 'ID cannot be empty',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please provide a valid email address',
  }),
  otp: Joi.alternatives().try(Joi.string(), Joi.number()).required().messages({
    'any.required': 'OTP is required',
  }),
}).or('id', 'email');

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().optional().messages({
    'string.empty': 'Refresh token cannot be empty',
  }),
});

export const updateSuperAdminSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  email: Joi.string().trim().lowercase().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  phone: Joi.string().trim().allow('', null).optional(),
  profileImage: Joi.string().trim().allow('', null).optional(),
}).min(1);

export const updateStaffSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  email: Joi.string().trim().lowercase().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  phone: Joi.string().trim().allow('', null).optional(),
  profileImage: Joi.string().trim().allow('', null).optional(),
}).min(1);

export const updateCompanyDetailsSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).optional().messages({
    'string.min': 'Company name must be at least 2 characters long',
    'string.max': 'Company name cannot exceed 120 characters',
  }),
  email: Joi.string().trim().lowercase().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  phone: Joi.string().trim().allow('', null).optional(),
  address: Joi.string().trim().max(300).allow('', null).optional(),
  logo: Joi.string().trim().allow('', null).optional(),
  contactPersonName: Joi.string().trim().max(100).allow('', null).optional(),
  regDetails: Joi.string().trim().max(200).allow('', null).optional(),
  country: Joi.string().trim().max(100).allow('', null).optional(),
}).min(1);

export const updateTravelerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  email: Joi.string().trim().lowercase().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  phone: Joi.string().trim().allow('', null).optional(),
  profileImage: Joi.string().trim().allow('', null).optional(),
}).min(1);

export default {
  loginEmailSchema,
  verifyOtpSchema,
  refreshTokenSchema,
  updateSuperAdminSchema,
  updateStaffSchema,
  updateCompanyDetailsSchema,
  updateTravelerSchema,
};

