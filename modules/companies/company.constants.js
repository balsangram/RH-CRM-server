export const COMPANY_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
});

export const COMPANY_STATUS_LIST = Object.values(COMPANY_STATUS);

export const DEFAULT_PAGINATION = Object.freeze({
  PAGE: 1,
  LIMIT: 10,
  SORT_BY: "createdAt",
  SORT_ORDER: "desc",
});

export const ALLOWED_SORT_FIELDS = [
  "name",
  "email",
  "phone",
  "address",
  "country",
  "status",
  "contactPersonName",
  "regDetails",
  "createdAt",
  "updatedAt",
];

export default {
  COMPANY_STATUS,
  COMPANY_STATUS_LIST,
  DEFAULT_PAGINATION,
  ALLOWED_SORT_FIELDS,
};
