export const PERMISSION_MODULES = Object.freeze({
  STAFF_MANAGEMENT: "STAFF_MANAGEMENT",
  HOLIDAYS: "HOLIDAYS",
  VISAS: "VISAS",
  COMPANIES: "COMPANIES",
  APPLICATIONS: "APPLICATIONS",
  PAYMENTS: "PAYMENTS",
  REVIEWS: "REVIEWS",
  REPORTS: "REPORTS",
});

export const AVAILABLE_PERMISSIONS = Object.freeze([
  "staff:read",
  "staff:write",
  "staff:delete",
  "holiday:read",
  "holiday:write",
  "holiday:delete",
  "visa:read",
  "visa:write",
  "visa:delete",
  "company:read",
  "company:write",
  "company:delete",
  "application:read",
  "application:write",
  "application:assign",
  "application:delete",
  "payment:read",
  "payment:write",
  "review:read",
  "review:write",
  "reports:read",
]);

export const APPLICATION_TYPES = Object.freeze({
  BOOKING: "booking",
  VISA: "visa",
});

export const ARCHIVE_STATUSES = Object.freeze(["completed", "rejected", "canceled", "unassigned"]);

export default {
  PERMISSION_MODULES,
  AVAILABLE_PERMISSIONS,
  APPLICATION_TYPES,
  ARCHIVE_STATUSES,
};
