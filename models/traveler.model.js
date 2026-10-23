import mongoose from "mongoose";

const travelerSchema = new mongoose.Schema(
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

export default mongoose.model("Traveler", travelerSchema);