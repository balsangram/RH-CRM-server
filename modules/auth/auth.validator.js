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

export default {
  loginEmailSchema,
  verifyOtpSchema,
  refreshTokenSchema,
};
