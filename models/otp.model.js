import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    userType: {
      type: String,
      required: true,
      enum: ["super_admin", "staff", "company", "individual", "traveler"],
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 2 * 60 * 1000), // 2 minutes from creation
      index: { expires: 0 }, // MongoDB TTL auto-cleanup
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
