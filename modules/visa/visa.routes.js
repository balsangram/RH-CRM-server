import express from "express";
import validate from "../../middlewares/validate.middleware.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import Roles from "../../shared/constants/roles.constants.js";
import {
    uploadS3Image,
    uploadS3Fields,
    parseFormData,
} from "../../middlewares/upload.middleware.js";
import {
    createVisaCountrySchema,
    updateVisaCountrySchema,
    bulkCreateVisaCountrySchema,
    createVisaPackageSchema,
    updateVisaPackageSchema,
} from "./visa.validator.js";
import {
    getOutsiderPackages,
    getOutsiderPackageById,
    getOutsiderCountries,
    getOutsiderCountryById,
    createVisaPackage,
    getAllVisaPackages,
    getVisaPackageById,
    updateVisaPackage,
    deleteVisaPackage,
    createVisaCountry,
    bulkCreateVisaCountries,
    getAllVisaCountries,
    getVisaCountryById,
    updateVisaCountry,
    deleteVisaCountry,
} from "./visa.controller.js";

const router = express.Router();

// ============================================================================
// Outsider Routes (Public / Available to all: Travelers, Companies, Visitors)
// ============================================================================
router.get("/outsider", getOutsiderPackages);
router.get("/outsider/countries", getOutsiderCountries);
router.get("/outsider/countries/:id", getOutsiderCountryById);
router.get("/outsider/:id", getOutsiderPackageById);

// ============================================================================
// Visa Country Management Routes (Super Admin & Staff)
// ============================================================================
router.get(
    "/countries/all",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    getAllVisaCountries
);
router.get(
    "/countries/:id",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    getVisaCountryById
);
router.post(
    "/countries",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    uploadS3Image("image", "countries"),
    validate(createVisaCountrySchema),
    createVisaCountry
);
router.post(
    "/countries/bulk",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    parseFormData(),
    validate(bulkCreateVisaCountrySchema),
    bulkCreateVisaCountries
);
router.patch(
    "/countries/:id",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    uploadS3Image("image", "countries"),
    validate(updateVisaCountrySchema),
    updateVisaCountry
);
router.delete(
    "/countries/:id",
    authenticate,
    authorize(Roles.SUPER_ADMIN),
    deleteVisaCountry
);

// ============================================================================
// Visa Package Management Routes (Super Admin & Staff)
// ============================================================================
router.get(
    "/",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    getAllVisaPackages
);
router.get(
    "/:id",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    getVisaPackageById
);
router.post(
    "/",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    uploadS3Fields(
        [
            { name: "image", maxCount: 1 },
            { name: "sideImages", maxCount: 10 },
            { name: "visaType", maxCount: 10 },
        ],
        "visas"
    ),
    validate(createVisaPackageSchema),
    createVisaPackage
);
router.patch(
    "/:id",
    authenticate,
    authorize(Roles.SUPER_ADMIN, Roles.STAFF),
    uploadS3Fields(
        [
            { name: "image", maxCount: 1 },
            { name: "sideImages", maxCount: 10 },
            { name: "visaType", maxCount: 10 },
        ],
        "visas"
    ),
    validate(updateVisaPackageSchema),
    updateVisaPackage
);
router.delete(
    "/:id",
    authenticate,
    authorize(Roles.SUPER_ADMIN),
    deleteVisaPackage
);

export default router;