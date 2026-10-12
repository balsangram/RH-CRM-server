
import mongoose from "mongoose";

const visaApplicationSchema = new mongoose.Schema(
  {
    // Applicant Details
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    targetCountry: {
      type: String,
      required: true,
      trim: true,
    },
    visaType: {
      type: String,
      required: true,
      trim: true,
    },
    passportDetails: {
      passportNumber: {
        type: String,
        required: true,
        trim: true,
      },
      issueDate: {
        type: Date,
      },
      expiryDate: {
        type: Date,
      },
      issuingCountry: {
        type: String,
        trim: true,
      },
    },
    caseOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },

    // Application Status
    status: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "provided",
        "approved",
        "rejected",
        "completed",
      ],
      default: "pending",
    },

    // Document Management & Verification
    documents: [
      {
        documentName: {
          type: String,
          required: true,
          trim: true,
        },
        documentRequirement: {
          type: String,
          trim: true,
        },
        verificationStatus: {
          type: String,
          enum: ["pending", "verified", "rejected"],
          default: "pending",
        },
        fileUrl: {
          type: String,
          trim: true,
        },
        uploadedAt: {
          type: Date,
        },
      },
    ],

    // Payment Management - Multiple Entries

payments: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
],


    // Visa File Upload & Download
    visaFile: {
      fileName: {
        type: String,
        trim: true,
      },
      fileUrl: {
        type: String,
        trim: true,
      },
      fileType: {
        type: String,
        trim: true,
      },
      uploadedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

const VisaApplication = mongoose.model(
  "VisaApplication",
  visaApplicationSchema
);

export default VisaApplication;
