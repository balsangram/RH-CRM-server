import Joi from 'joi';

export const loginEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
});

export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  otp: Joi.alternatives().try(Joi.string(), Joi.number()).required().messages({
    'any.required': 'OTP is required',
  }),
});

export default {
  loginEmailSchema,
  verifyOtpSchema,
};
