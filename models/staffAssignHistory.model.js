import mongoose from "mongoose";

const staffAssignHistorySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubAdmin",
      required: true,
      index: true,
    },
    staffName: {
      type: String,
      default: null,
      trim: true,
    },
    staffEmail: {
      type: String,
      default: null,
      trim: true,
    },
    applicationType: {
      type: String,
      enum: ["booking", "visa"],
      required: true,
      index: true,
    },
    // Direct basic application details stored directly
    applicationDetails: {
      applicationId: {
        type: String,
        default: null,
      },
      customerName: {
        type: String,
        default: null,
        trim: true,
      },
      email: {
        type: String,
        default: null,
        trim: true,
      },
      phone: {
        type: String,
        default: null,
        trim: true,
      },
      destinationOrCountry: {
        type: String,
        default: null,
        trim: true,
      },
      packageNameOrVisaType: {
        type: String,
        default: null,
        trim: true,
      },
      duration: {
        type: String,
        default: null,
      },
      totalPrice: {
        type: Number,
        default: null,
      },
      passportNumber: {
        type: String,
        default: null,
        trim: true,
      },
      applicationDate: {
        type: Date,
        default: null,
      },
    },
    finalStatus: {
      type: String,
      enum: ["completed", "rejected", "canceled", "unassigned"],
      required: true,
      index: true,
    },
    assignedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: Date.now,
    },
    remarks: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

staffAssignHistorySchema.index({ staffId: 1, endedAt: -1 });
staffAssignHistorySchema.index({ "applicationDetails.customerName": 1 });
staffAssignHistorySchema.index({ "applicationDetails.email": 1 });

const StaffAssignHistory = mongoose.model(
  "StaffAssignHistory",
  staffAssignHistorySchema
);

export default StaffAssignHistory;
