/**
 * Date and time helper utilities
 */

export const formatDate = (date = new Date(), locale = 'en-US', options = {}) => {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
};

export const formatDateTime = (date = new Date()) => {
  const d = new Date(date);
  return d.toISOString();
};

export const addDays = (date = new Date(), days = 0) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isExpired = (expiryDate) => {
  if (!expiryDate) return false;
  return new Date() > new Date(expiryDate);
};

export default {
  formatDate,
  formatDateTime,
  addDays,
  isExpired,
};
