import mongoose from "mongoose";

const { Schema } = mongoose;

const itinerarySchema = new Schema({
  dayLabel: {
    type: String,
    required: true,
    trim: true,
  },
  dayTitle: {
    type: String,
    required: true,
    trim: true,
  },
  dayActivityDetails: {
    type: String,
    required: true,
  },
});

const holidayPackageSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    packageId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    countryOrRegion: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    packagePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    tourOverviewAndDescription: {
      type: String,
      required: true,
    },
    packageInclusions: {
      type: [String],
      default: [],
    },
    packageExclusions: {
      type: [String],
      default: [],
    },
    dayByDayItinerary: {
      type: [itinerarySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const HolidayPackage = mongoose.model(
  "HolidayPackage",
  holidayPackageSchema
);

export default HolidayPackage;