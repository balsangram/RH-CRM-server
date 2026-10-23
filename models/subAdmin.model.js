import mongoose from "mongoose";

const subAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
      trim: true,
    },
    profileImage: {
      type: String,
      default: null,
      trim: true,
    },
    role: {
      type: String,
      default: "STAFF",
      trim: true,
    },
    permissions: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    assignedApplications: [
      {
        applicationType: {
          type: String,
          enum: ["booking", "visa"],
          required: true,
        },
        applicationId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "assignedApplications.applicationModel",
        },
        applicationModel: {
          type: String,
          enum: ["BookingApplication", "VisaApplication"],
          required: true,
        },
        assignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubAdmin", subAdminSchema);