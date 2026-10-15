/**
 * Extract and normalize pagination parameters from request query
 * @param {object} query
 * @param {number} defaultLimit
 */
export const getPagination = (query, defaultLimit = 10) => {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(query.limit || String(defaultLimit), 10)));
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

/**
 * Format paginated result structure
 * @param {Array} data
 * @param {number} totalCount
 * @param {number} page
 * @param {number} limit
 */
export const formatPaginatedResult = (data, totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return {
    items: data,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export default {
  getPagination,
  formatPaginatedResult,
};
