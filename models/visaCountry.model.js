import mongoose from "mongoose";

const { Schema } = mongoose;

const visaCountrySchema = new Schema(
  {
    countryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    countryCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      minlength: 2,
      maxlength: 3,
    },
    flagEmoji: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const VisaCountry = mongoose.model("VisaCountry", visaCountrySchema);

export default VisaCountry;
export { VisaCountry };
