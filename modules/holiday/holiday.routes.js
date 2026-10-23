import express from "express";
import validate from "../../middlewares/validate.middleware.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import Roles from "../../shared/constants/roles.constants.js";
import { uploadS3Fields } from "../../middlewares/upload.middleware.js";
import {
  createHolidayPackageSchema,
  updateHolidayPackageSchema,
} from "./holiday.validator.js";
import {
  getOutsiderHolidayPackages,
  getOutsiderHolidayPackageById,
  createHolidayPackage,
  getAllHolidayPackages,
  getHolidayPackageById,
  updateHolidayPackage,
  deleteHolidayPackage,
} from "./holiday.controller.js";

const router = express.Router();

// ============================================================================
// Outsider Routes (Public / Available for all visitors & travelers)
// ============================================================================
router.get("/outsider", getOutsiderHolidayPackages);
router.get("/outsider/:id", getOutsiderHolidayPackageById);

// ============================================================================
// Admin & Staff Holiday Package Routes
// ============================================================================
router.get(
  "/",
  authenticate,
  authorize(Roles.SUPER_ADMIN, Roles.STAFF),
  getAllHolidayPackages
);

router.get(
  "/:id",
  authenticate,
  authorize(Roles.SUPER_ADMIN, Roles.STAFF),
  getHolidayPackageById
);

router.post(
  "/",
  authenticate,
  authorize(Roles.SUPER_ADMIN, Roles.STAFF),
  uploadS3Fields(
    [
      { name: "coverImage", maxCount: 1 },
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 15 },
    ],
    "holidays"
  ),
  validate(createHolidayPackageSchema),
  createHolidayPackage
);

router.patch(
  "/:id",
  authenticate,
  authorize(Roles.SUPER_ADMIN, Roles.STAFF),
  uploadS3Fields(
    [
      { name: "coverImage", maxCount: 1 },
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 15 },
    ],
    "holidays"
  ),
  validate(updateHolidayPackageSchema),
  updateHolidayPackage
);

router.delete(
  "/:id",
  authenticate,
  authorize(Roles.SUPER_ADMIN),
  deleteHolidayPackage
);

export default router;