import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Individual Document Requirement Schema
 * Can be MANDATORY, OPTIONAL, or ALTERNATIVE (part of a group rule)
 */
const documentItemSchema = new Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
  },
  requirementType: {
    type: String,
    enum: ["MANDATORY", "OPTIONAL", "ALTERNATIVE"],
    default: "MANDATORY",
  },
  groupName: {
    type: String,
    default: null,
    trim: true, // e.g. "Financial Proof", "Identity Proof"
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  guidelinesAndFormatInstructions: {
    type: String,
    default: "PDF, JPG or PNG format, max 5MB",
    trim: true,
  },
});

/**
 * Conditional / Alternate Document Group Rule Schema
 * Example: In a group of 3 documents (Bank Statement, ITR, FD), any 2 are required.
 */
const documentGroupRuleSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
  },
  minRequired: {
    type: Number,
    required: true,
    default: 1, // e.g. 2 out of 3
  },
  documents: {
    type: [String],
    default: [],
  },
  ruleDescription: {
    type: String,
    default: "",
    trim: true, // e.g. "Please submit any 2 of the 3 listed financial documents"
  },
});

const costBreakdownSchema = new Schema({
  visaFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  serviceFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  currency: {
    type: String,
    default: "INR",
    trim: true,
  },
  note: {
    type: String,
    default: "",
    trim: true,
  },
});

const faqSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

const visaPackageSchema = new Schema(
  {
    country: {
      type: Schema.Types.ObjectId,
      ref: "VisaCountry",
      required: true,
    },
    countryName: {
      type: String,
      required: true,
      trim: true,
    },
    countryCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    visaCategory: {
      type: String,
      default: "",
      trim: true, // e.g. "Student Visa", "Tourist Visa", "Work Visa", "Business Visa", "PR"
    },
    visaType: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    sideImages: {
      type: [String],
      default: [],
    },
    validityPeriod: {
      type: String,
      required: true,
      trim: true, // e.g. "Up to 3 years", "6 months", "10 years multiple entry"
    },
    permittedStayDuration: {
      type: String,
      required: true,
      trim: true, // e.g. "Duration of study course", "90 days per entry"
    },
    standardProcessingTime: {
      type: String,
      required: true,
      trim: true, // e.g. "4 to 6 weeks", "15 working days"
    },
    embassyStatus: {
      type: String,
      default: "Accepting Applications",
      trim: true,
    },

    // Estimated Cost & Breakdown
    estimatedCost: {
      type: Number,
      required: true,
      min: 0,
    },
    costBreakdown: {
      type: costBreakdownSchema,
      default: () => ({}),
    },

    // Specific Criteria (Student, Job, Qualifications, Education)
    qualification: {
      type: [String],
      default: [], // e.g. ["12th / High School Graduate", "Bachelor's Degree in relevant field"]
    },
    education: {
      type: [String],
      default: [], // e.g. ["Offer letter from recognized DLI college", "Academic marksheets & transcripts"]
    },
    job: {
      type: [String],
      default: [], // e.g. ["No prior work experience required for study visa", "2 years relevant job experience"]
    },
    languageRequirement: {
      type: [String],
      default: [], // e.g. ["IELTS 6.0 overall (no band < 5.5)", "PTE 58+"]
    },
    ageLimit: {
      type: String,
      default: null,
      trim: true, // e.g. "18 - 35 years"
    },
    financialRequirements: {
      type: String,
      default: null,
      trim: true, // e.g. "Proof of funds for tuition fee + 1 year living expenses (CAD 20,635)"
    },
    eligibilityCriteria: {
      type: [String],
      default: [],
    },

    // Document Requirements with Mandatory, Optional, and Alternative/Group rules
    documentRequirements: {
      type: [documentItemSchema],
      default: [],
    },
    documentGroupRules: {
      type: [documentGroupRuleSchema],
      default: [],
    },

    // Step-by-step guidance & FAQs
    stepByStepGuidance: {
      type: [String],
      default: [],
    },
    faqs: {
      type: [faqSchema],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const VisaPackage = mongoose.model("VisaPackage", visaPackageSchema);

export default VisaPackage;
export { VisaPackage };