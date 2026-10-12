
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    bookingAppId: {
      type: String,
      required: true,
      trim: true,
    },

    packageName: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    reviewText: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    crmStatus: {
      type: String,
      enum: ["Published", "Pending Review"],
      default: "Pending Review",
    },

    websiteSync: {
      type: String,
      enum: ["Visible", "Hidden"],
      default: "Hidden",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
