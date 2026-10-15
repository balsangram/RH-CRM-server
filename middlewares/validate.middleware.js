import BadRequestError from '../shared/errors/bad-request.error.js';

/**
 * Request validation middleware using Joi
 * @param {import('joi').ObjectSchema} schema
 * @param {'body' | 'query' | 'params'} source
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    if (!schema) return next();

    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));

      return next(new BadRequestError('Validation Error', details));
    }

    req[source] = value;
    next();
  };
};

export default validate;
export { validate };
