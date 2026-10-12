import mongoose from "mongoose";

const { Schema } = mongoose;

const visaTypeSchema = new Schema({
  visaTypeName: {
    type: String,
    required: true,
    trim: true,
  },
  validityPeriod: {
    type: String,
    required: true,
  },
  permittedStayDuration: {
    type: String,
    required: true,
  },
  processingFee: {
    type: Number,
    required: true,
    min: 0,
  },
});

const documentRequirementSchema = new Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
  },
  requirementType: {
    type: String,
    required: true,
    trim: true,
  },
  guidelinesAndFormatInstructions: {
    type: String,
    required: true,
  },
});

const visaPackageSchema = new Schema(
  {
    countryName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    sideImages: {
      type: [String],
      default: [],
    },
    countryCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    visaTypesProvided: {
      type: [visaTypeSchema],
      default: [],
    },
    standardProcessingTime: {
      type: String,
      required: true,
    },
    startingVisaFee: {
      type: Number,
      required: true,
      min: 0,
    },
    embassyStatus: {
      type: String,
      required: true,
      trim: true,
    },
    documentRequirements: {
      type: [documentRequirementSchema],
      default: [],
    },
    stepByStepGuidance: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const VisaPackage = mongoose.model(
  "VisaPackage",
  visaPackageSchema
);

export default VisaPackage;