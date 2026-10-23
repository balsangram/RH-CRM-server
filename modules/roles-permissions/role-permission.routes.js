import express from "express";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import Roles from "../../shared/constants/roles.constants.js";
import { uploadS3Image } from "../../middlewares/upload.middleware.js";
import {
  createStaffRoleSchema,
  updateStaffRoleSchema,
  assignTaskSchema,
  unassignTaskSchema,
  updateApplicationStatusSchema,
  getRolesPermissionsQuerySchema,
} from "./role-permission.validator.js";
import {
  getAllStaffRoles,
  getStaffRoleById,
  createStaffRole,
  updateStaffRole,
  deleteStaffRole,
  assignTask,
  unassignTask,
  updateApplicationStatus,
  getStaffHistory,
} from "./role-permission.controller.js";

const router = express.Router();

// All role and permission management routes require Super Admin authorization
router.use(authenticate, authorize(Roles.SUPER_ADMIN));

// ============================================================================
// Staff Roles & Permissions CRUD Routes
// ============================================================================
router.get("/", validate(getRolesPermissionsQuerySchema, "query"), getAllStaffRoles);
router.get("/history", getStaffHistory);
router.get("/:id", getStaffRoleById);
router.post(
  "/",
  uploadS3Image("profileImage", "staff"),
  validate(createStaffRoleSchema),
  createStaffRole
);
router.patch(
  "/:id",
  uploadS3Image("profileImage", "staff"),
  validate(updateStaffRoleSchema),
  updateStaffRole
);
router.delete("/:id", deleteStaffRole);

// ============================================================================
// Task Assignment & Status Archival Routes
// ============================================================================
router.post("/assign-task", validate(assignTaskSchema), assignTask);
router.patch("/unassign-task/:id", validate(unassignTaskSchema), unassignTask);
router.patch("/application-status", validate(updateApplicationStatusSchema), updateApplicationStatus);

export default router;