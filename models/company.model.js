import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
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
    address: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      lowercase: true,
      trim: true,
      index: true,
    },
    logo: {
      type: String,
      default: null,
      trim: true,
    },
    contactPersonName: {
      type: String,
      default: null,
      trim: true,
    },
    regDetails: {
      type: String,
      default: null,
      trim: true,
    },
    country: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },
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

export default mongoose.model("Company", companySchema);